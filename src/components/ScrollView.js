import createStyles from './ScrollView.styles';
import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { isIOS, forwardRef, debounce, eventOptions } from '../util';
import { refType } from '../PropTypes';
import Observer from '../Observer';
import FixedState from '../FixedState';
import PullingDown from '../PullingDown';
import { ObserverContext, FixedContext } from '../Contexts';
import Hook from './Hook';
import FixedContainer from './FixedContainer';
import warning from 'warning';

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
		refreshControl: PropTypes.node,
	};

	static defaultProps = {
		endReachedThreshold: 0,
		isHorizontal: false,
		disabled: false,
	};

	constructor(props) {
		super(props);

		const { isHorizontal, onEndReached, refreshControl } = props;

		warning(
			!isHorizontal || !refreshControl,
			'`refreshControl` with `isHorizontal` is NOT supported, `refreshControl` will be ignored',
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

	componentWillUnmount() {
		const { dom } = this;
		this.toEmitOnScrollEnd.clearDebounce();
		this.unregisterTouchEvents(dom);
	}

	scrollViewRef = (dom) => {
		forwardRef(this.props.innerRef, dom);
		this.dom = dom;
	};

	refreshControlRef = (ref) => {
		this.refreshControl = ref.control;
	};

	contentContainerRef = (contentContainer) => {
		this.contentContainer = contentContainer;
	};

	registerTouchEvents = (dom) => {
		if (!this.props.refreshControl) return;
		this.pullingDown = new PullingDown(this.dom);
		dom.addEventListener('touchstart', this.handleTouchStart, eventOptions);
		dom.addEventListener('touchmove', this.handleTouchMove, eventOptions);
		dom.addEventListener('touchend', this.handleTouchEnd, eventOptions);
	};

	unregisterTouchEvents = (dom) => {
		if (!this.props.refreshControl) return;
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
		const touchClient = ev.touches[0];
		const dy = touchClient.clientY - this.y0;
		if (!this.pullingDown.isActive) {
			if (this.dom.scrollTop <= 0) {
				if (dy > 0) {
					this.pullingDown.start();
					this.refreshControl.start();
				}
			}
			else {
				this.y0 = touchClient.clientY;
			}
		}
		else if (dy <= 0) {
			this.refreshControl.setHeight(0);
			this.pullingDown.stop();
		}

		if (this.pullingDown.isActive) {
			this.refreshControl.setHeight(dy);
		}
	};

	handleTouchEnd = () => {
		this.y0 = undefined;
		if (this.pullingDown.isActive) {
			const { refreshControl } = this;
			refreshControl.attemptToRefresh();
			this.pullingDown.stop();
		}
	};

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
				disabled,
				refreshControl,
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
								refreshControl &&
								cloneElement(refreshControl, {
									ref: this.refreshControlRef,
								})}
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
