import styles from '../styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isIOS, forwardRef, debounce } from '../util';
import { refType } from '../PropTypes';
import Observer from '../Observer';
import FixedState from '../FixedState';
import Hook from './Hook';
import RefreshControl from './RefreshControl';
import { ObserverContext, FixedContext } from '../Contexts';
import warning from 'warning';

export default class ScrollView extends Component {
	static propTypes = {
		style: PropTypes.object,
		containerStyle: PropTypes.object,
		containerClassName: PropTypes.string,
		contentContainerStyle: PropTypes.object,
		contentContainerClassName: PropTypes.string,
		children: PropTypes.node,
		onScrollStart: PropTypes.func,
		onScroll: PropTypes.func,
		onScrollEnd: PropTypes.func,
		onEndReached: PropTypes.func,
		onTouchStart: PropTypes.func,
		onTouchMove: PropTypes.func,
		onTouchEnd: PropTypes.func,
		endReachedThreshold: PropTypes.number,
		isHorizontal: PropTypes.bool,
		innerRef: refType,
		disabled: PropTypes.bool,
		onRefresh: PropTypes.func,
		isRefreshing: PropTypes.bool,
		refreshControlColor: PropTypes.string,
		refreshControlStyle: PropTypes.object,
	};

	static defaultProps = {
		endReachedThreshold: 0,
		isHorizontal: false,
		disabled: false,
		isRefreshing: false,
		refreshControlColor: '#333',
	};

	constructor(props) {
		super(props);

		const { isHorizontal, onEndReached, onRefresh } = props;

		warning(
			!isHorizontal || !onRefresh,
			'`onRefresh` with `isHorizontal` is NOT supported, `onRefresh` will be ignored',
		);

		warning(
			!isHorizontal || !onEndReached,
			'`onEndReached` with `isHorizontal` is NOT supported, `onEndReached` will be ignored',
		);

		this.observer = new Observer();
		this.toEmitOnScrollEnd = debounce((ev) => {
			const { onScrollEnd } = this.props;
			this.isScrolling = false;
			onScrollEnd && onScrollEnd(ev);
		}, 100);

		this.fixedChildren = [];
		this.fixedState = new FixedState(this.forceUpdate.bind(this));
	}

	componentDidMount() {
		const { dom } = this;
		this.observer.mount(dom);
	}

	componentDidUpdate(prevProps) {
		const { isRefreshing } = this.props;
		if (prevProps.isRefreshing && !isRefreshing) {
			const { refreshControl } = this;
			if (refreshControl) {
				refreshControl.end();
				refreshControl.setHeight(0);
			}
		}
	}

	componentWillUnmount() {
		this.toEmitOnScrollEnd.clearDebounce();
	}

	scrollViewRef = (dom) => {
		forwardRef(this.props.innerRef, dom);
		this.dom = dom;
	};

	refreshControlRef = (refreshControl) => {
		this.refreshControl = refreshControl;
	};

	handleEndEnter = ({ direction }) => {
		const { onEndReached } = this.props;
		if (direction === 'down' && onEndReached) onEndReached();
	};

	handleScroll = (ev) => {
		const { props: { onScrollStart, onScroll }, isScrolling } = this;
		this.observer.updateDirection(ev);
		if (!isScrolling) {
			this.isScrolling = true;
			onScrollStart && onScrollStart(ev);
		}
		onScroll && onScroll(ev);
		this.toEmitOnScrollEnd(ev);
	};

	handleTouchStart = (ev) => {
		const { onTouchStart, onRefresh } = this.props;
		onTouchStart && onTouchStart(ev);
		if (!onRefresh) return;
		if (this.dom.scrollTop <= 0) {
			this.y0 = ev.touches[0].clientY;
		}
	};

	handleTouchMove = (ev) => {
		const { onTouchMove, onRefresh } = this.props;
		onTouchMove && onTouchMove(ev);
		if (!onRefresh) return;
		if (this.y0) {
			const dy = ev.touches[0].clientY - this.y0;
			if (dy > 0 && !this.isPullingDown) {
				this.refreshControl.start();
				this.overflowStyle = this.dom.style.overflowY;
				this.dom.style.overflowY = 'hidden';
				this.isPullingDown = true;
			}
			else if (dy <= 0 && this.isPullingDown) {
				this.refreshControl.setHeight(0);
				this.dom.style.overflowY = this.overflowStyle;
				this.isPullingDown = false;
			}
			if (this.isPullingDown) {
				this.refreshControl.setHeight(dy);
			}
		}
	};

	handleTouchEnd = (ev) => {
		const { onTouchEnd, onRefresh, isRefreshing } = this.props;
		onTouchEnd && onTouchEnd(ev);
		if (!onRefresh) return;
		this.y0 = null;
		if (isRefreshing || this.isPullingDown) {
			const { refreshControl } = this;
			if (!isRefreshing && refreshControl.shouldRefresh) {
				onRefresh();
			}
			refreshControl.end();
			if (isRefreshing || refreshControl.shouldRefresh) {
				refreshControl.show();
			}
			else {
				refreshControl.setHeight(0);
			}
			this.dom.style.overflowY = this.overflowStyle;
			this.isPullingDown = false;
		}
	};

	render() {
		const {
			props: {
				style,
				containerStyle,
				containerClassName,
				contentContainerStyle,
				contentContainerClassName,
				children,
				onScrollStart,
				onScrollEnd,
				onEndReached,
				endReachedThreshold,
				isHorizontal,
				onRefresh,
				disabled,
				isRefreshing,
				refreshControlColor,
				refreshControlStyle,
				innerRef,
				...other
			},
			observer,
			fixedState,
		} = this;
		const direction = isHorizontal ? 'horizontal' : 'vertical';
		return (
			<ObserverContext.Provider value={observer}>
				<FixedContext.Provider value={fixedState}>
					<div
						style={styles.container(containerStyle)}
						className={containerClassName}
					>
						<div
							{...other}
							style={styles.main(style, direction, disabled)}
							ref={this.scrollViewRef}
							onScroll={this.handleScroll}
							onTouchStart={this.handleTouchStart}
							onTouchMove={this.handleTouchMove}
							onTouchEnd={this.handleTouchEnd}
						>
							{!isHorizontal &&
								onRefresh && (
								<RefreshControl
									ref={this.refreshControlRef}
									isRefreshing={isRefreshing}
									color={refreshControlColor}
									style={refreshControlStyle}
								/>
							)}
							<div
								style={contentContainerStyle}
								className={contentContainerClassName}
							>
								{children}
							</div>
							{isIOS && <div style={styles.background(direction)} />}
							{!isHorizontal && (
								<Hook
									style={styles.endHook(endReachedThreshold)}
									onEnter={this.handleEndEnter}
								/>
							)}
						</div>
						<div style={styles.fixedContainer(contentContainerStyle)}>
							{fixedState.children}
						</div>
					</div>
				</FixedContext.Provider>
			</ObserverContext.Provider>
		);
	}
}
