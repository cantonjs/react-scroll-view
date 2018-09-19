import createStyles from './ScrollView.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isIOS, forwardRef, debounce, eventOptions } from '../util';
import { refType } from '../PropTypes';
import Observer from '../Observer';
import FixedState from '../FixedState';
import Hook from './Hook';
import RefreshControl from './RefreshControl';
import FixedContainer from './FixedContainer';
import { ObserverContext, FixedContext } from '../Contexts';
import warning from 'warning';

window.addEventListener(
	'touchmove',
	(ev) => {
		ev.cancelable !== false && ev.preventDefault();
	},
	eventOptions,
);

export default class ScrollView extends Component {
	static propTypes = {
		style: PropTypes.object,
		className: PropTypes.string,
		contentContainerStyle: PropTypes.object,
		contentContainerClassName: PropTypes.string,
		children: PropTypes.node,
		onScrollStart: PropTypes.func,
		onScroll: PropTypes.func,
		onScrollEnd: PropTypes.func,
		onEndReached: PropTypes.func,
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

		this.styles = createStyles();
		this.observer = new Observer();
		this.toEmitOnScrollEnd = debounce((ev) => {
			const { onScrollEnd } = this.props;
			this.isScrolling = false;
			onScrollEnd && onScrollEnd(ev);
		}, 100);

		this.fixedChildren = [];
		this.fixedState = new FixedState();
	}

	componentDidMount() {
		const { dom } = this;
		this.observer.mount(dom);
		this.registerTouchEvents(dom);
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
		const { dom } = this;
		this.toEmitOnScrollEnd.clearDebounce();
		this.unregisterTouchEvents(dom);
	}

	scrollViewRef = (dom) => {
		forwardRef(this.props.innerRef, dom);
		this.dom = dom;
	};

	refreshControlRef = (refreshControl) => {
		this.refreshControl = refreshControl;
	};

	contentContainerRef = (contentContainer) => {
		this.contentContainer = contentContainer;
	};

	registerTouchEvents = (dom) => {
		const { onRefresh } = this.props;
		if (!onRefresh) {
			return dom.addEventListener(
				'touchmove',
				this.handleResumeTouchMove,
				eventOptions,
			);
		}
		dom.addEventListener('touchstart', this.handleTouchStart, eventOptions);
		dom.addEventListener('touchmove', this.handleTouchMove, eventOptions);
		dom.addEventListener('touchend', this.handleTouchEnd, eventOptions);
	};

	unregisterTouchEvents = (dom) => {
		const { onRefresh } = this.props;
		if (!onRefresh) {
			return dom.removeEventListener(
				'touchmove',
				this.handleResumeTouchMove,
				eventOptions,
			);
		}
		dom.removeEventListener('touchstart', this.handleTouchStart, eventOptions);
		dom.removeEventListener('touchmove', this.handleTouchMove, eventOptions);
		dom.removeEventListener('touchend', this.handleTouchEnd, eventOptions);
	};

	handleEndEnter = () => {
		const { onEndReached } = this.props;
		if (onEndReached) onEndReached();
	};

	handleScroll = (ev) => {
		const { props: { onScrollStart, onScroll }, isScrolling } = this;
		if (!isScrolling) {
			this.isScrolling = true;
			onScrollStart && onScrollStart(ev);
		}
		onScroll && onScroll(ev);
		this.toEmitOnScrollEnd(ev);
	};

	handleTouchStart = (ev) => {
		this.y0 = ev.touches[0].clientY;
	};

	handleTouchMove = (ev) => {
		const dy = ev.touches[0].clientY - this.y0;
		if (!this.isPullingDown) {
			if (this.dom.scrollTop <= 0) {
				if (dy > 0) {
					this.refreshControl.start();
					this.overflowStyle = this.dom.style.overflowY;
					this.dom.style.overflowY = 'hidden';
					this.isPullingDown = true;
				}
			}
			else {
				this.y0 = ev.touches[0].clientY;
			}
		}
		else if (dy <= 0) {
			this.refreshControl.setHeight(0);
			this.revertRefreshState();
		}

		if (this.isPullingDown) {
			this.refreshControl.setHeight(dy);
		}
		else {
			ev.stopPropagation();
		}
	};

	handleTouchEnd = () => {
		const { onRefresh, isRefreshing } = this.props;
		this.y0 = undefined;
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
			this.revertRefreshState();
		}
	};

	handleResumeTouchMove = (ev) => {
		ev.stopPropagation();
	};

	revertRefreshState() {
		this.isPullingDown = false;
		this.dom.style.overflowY = this.overflowStyle;
	}

	render() {
		const {
			props: {
				style,
				className,
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
			styles,
			observer,
			fixedState,
		} = this;
		const direction = isHorizontal ? 'horizontal' : 'vertical';
		return (
			<ObserverContext.Provider value={observer}>
				<FixedContext.Provider value={fixedState}>
					<div style={styles.container(style)} className={className}>
						<div
							{...other}
							style={styles.main(direction, disabled)}
							ref={this.scrollViewRef}
							onScroll={this.handleScroll}
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
								ref={this.contentContainerRef}
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
						<FixedContainer
							style={styles.fixedContainer(contentContainerStyle)}
						>
							{fixedState.children}
						</FixedContainer>
					</div>
				</FixedContext.Provider>
			</ObserverContext.Provider>
		);
	}
}
