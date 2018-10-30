import createStyles from './ScrollView.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isIOS, forwardRef, debounce, eventOptions } from '../util';
import { refType } from '../PropTypes';
import Observer from '../Observer';
import FixedState from '../FixedState';
import RefreshState from '../RefreshState';
import PullingDown from '../PullingDown';
import Hook from './Hook';
import FixedContainer from './FixedContainer';
import warning from 'warning';
import { ObserverContext, FixedContext, RefreshContext } from '../Contexts';

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

		this.fixedState = new FixedState();

		if (props.refreshControl) this.refreshState = new RefreshState();
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

	scrollTo(val = 0) {
		const args = this.props.isHorizontal ? [val, 0] : [0, val];
		this.dom.scrollTo(...args);
	}

	registerTouchEvents = (dom) => {
		if (!this.refreshState) return;
		this.pullingDown = new PullingDown(this.dom);
		dom.addEventListener('touchstart', this.handleTouchStart, eventOptions);
	};

	unregisterTouchEvents = (dom) => {
		if (!this.refreshState) return;
		dom.removeEventListener('touchstart', this.handleTouchStart, eventOptions);
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
		const { dom } = this;
		this.y0 = ev.touches[0].clientY;
		dom.addEventListener('touchmove', this.handleTouchMove, eventOptions);
		dom.addEventListener('touchend', this.handleTouchEnd, eventOptions);
	};

	handleTouchMove = (ev) => {
		const touchClient = ev.touches[0];
		const dy = touchClient.clientY - this.y0;
		if (!this.pullingDown.isActive) {
			if (this.dom.scrollTop <= 0) {
				if (dy > 0) {
					this.pullingDown.start();
					this.refreshState.call('disableTransition');
				}
			}
			else {
				this.y0 = touchClient.clientY;
			}
		}
		else if (dy <= 0) {
			this.refreshState.call('setHeight', 0);
			this.pullingDown.stop();
		}

		if (this.pullingDown.isActive) {
			this.refreshState.call('setHeight', dy);
		}
	};

	handleTouchEnd = () => {
		const { dom } = this;
		this.y0 = 0;
		if (this.pullingDown.isActive) {
			this.refreshState.call('attemptToRefresh');
			this.pullingDown.stop();
		}

		dom.removeEventListener('touchmove', this.handleTouchMove, eventOptions);
		dom.removeEventListener('touchend', this.handleTouchEnd, eventOptions);
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
			refreshState,
		} = this;
		const direction = isHorizontal ? 'horizontal' : 'vertical';
		return (
			<ObserverContext.Provider value={observer}>
				<FixedContext.Provider value={fixedState}>
					<RefreshContext.Provider value={refreshState}>
						<div style={styles.container(style)} className={className}>
							<div
								{...other}
								style={styles.main(direction, disabled)}
								ref={this.scrollViewRef}
								onScroll={this.handleScroll}
							>
								{!isHorizontal && refreshControl}
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
							<FixedContainer
								style={styles.fixedContainer(contentContainerStyle)}
							>
								{fixedState.children}
							</FixedContainer>
						</div>
					</RefreshContext.Provider>
				</FixedContext.Provider>
			</ObserverContext.Provider>
		);
	}
}
