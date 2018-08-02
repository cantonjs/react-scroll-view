import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isIOS, debounce } from './util';
import Observer from './Observer';
import Intersection from './Intersection';
import Arrow from './Arrow';
import { ObserverContext } from './Contexts';

// TODO: should add [stickyheaderindices](https://facebook.github.io/react-native/docs/scrollview.html#stickyheaderindices) support

const PullThreshold = 80;

const styles = {
	main: {
		overflowY: isIOS ? 'scroll' : 'auto',
		position: 'relative',
	},
	refresh: {
		height: 0,
		overflow: 'hidden',
		position: 'relative',
	},
	refreshIcon: {
		width: 32,
		height: 32,
		position: 'absolute',
		left: '50%',
		bottom: PullThreshold / 2 - 16,
		marginLeft: -16,
	},
	background: {
		width: '100%',
		height: 'calc(100% + 2px)',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: -1,
	},
};

if (isIOS) {
	styles.main.WebkitOverflowScrolling = 'touch';
}

export default class ScrollView extends Component {
	static propTypes = {
		style: PropTypes.object,
		children: PropTypes.node,
		onScrollStart: PropTypes.func,
		onScroll: PropTypes.func,
		onScrollEnd: PropTypes.func,
		onEndReached: PropTypes.func,
		onTouchStart: PropTypes.func,
		onTouchMove: PropTypes.func,
		onTouchEnd: PropTypes.func,
		endReachedThreshold: PropTypes.number,
		onRefresh: PropTypes.func,
		innerRef: PropTypes.func,
		throttle: PropTypes.number,
		disabled: PropTypes.bool,
	};

	static defaultProps = {
		throttle: 0,
		endReachedThreshold: 0,
		disabled: false,
	};

	isScrolling = false;

	constructor(props) {
		super(props);

		this.observer = new Observer();
		this.toEmitOnScrollEnd = debounce((ev) => {
			const { onScrollEnd } = this.props;
			this.isScrolling = false;
			onScrollEnd && onScrollEnd(ev);
		}, 100);
	}

	componentDidMount() {
		const { dom, props: { endReachedThreshold } } = this;
		const rootMargin = `${endReachedThreshold}px`;
		this.observer.mount(dom, rootMargin);
		this.observeEndReached();
	}

	componentDidUpdate(prevProps) {
		const { onEndReached } = this.props;
		if (onEndReached !== prevProps.onEndReached) {
			if (onEndReached) this.observeEndReached();
			else this.unobserveEndReached();
		}
	}

	componentWillUnmount() {
		this.toEmitOnScrollEnd.clearDebounce();
	}

	scrollViewRef = (dom) => {
		const { innerRef } = this.props;
		innerRef && innerRef(dom);
		this.dom = dom;
	};

	endRef = (dom) => {
		this.end = dom;
	};

	refreshRef = (dom) => {
		this.refresh = dom;
	};

	refreshIconRef = (refreshIcon) => {
		this.refreshIcon = refreshIcon;
	};

	observeEndReached() {
		const { end, props: { onEndReached } } = this;
		if (onEndReached) {
			const intersection = new Intersection({ onEnter: onEndReached });
			this.observer.observe(end, intersection);
		}
	}

	unobserveEndReached() {
		this.observer.unobserve(this.end);
	}

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
		const { onTouchStart } = this.props;
		onTouchStart && onTouchStart(ev);
		if (this.dom.scrollTop <= 0) {
			this.y0 = ev.touches[0].clientY;
		}
	};

	handleTouchMove = (ev) => {
		const { onTouchMove } = this.props;
		onTouchMove && onTouchMove(ev);
		if (this.y0) {
			const dy = ev.touches[0].clientY - this.y0;
			if (dy > 0 && !this.isPullingDown) {
				this.refresh.style.transition = 'none';
				this.dom.style.overflow = 'hidden';
				this.isPullingDown = true;
			}
			else if (dy <= 0 && this.isPullingDown) {
				this.refresh.style.height = 0;
				this.dom.style.overflow = 'scroll';
				this.isPullingDown = false;
			}
			if (this.isPullingDown) {
				this.refresh.style.height = `${dy > 0 ? dy : 0}px`;
				this.refreshIcon.setDelta(dy);
			}
		}
	};

	handleTouchEnd = (ev) => {
		const { onTouchEnd, onRefresh } = this.props;
		onTouchEnd && onTouchEnd(ev);
		if (this.isPullingDown) {
			this.y0 = null;
			this.refresh.style.height = 0;
			this.refresh.style.transition = 'height 0.3s ease-out';
			this.dom.style.overflow = 'scroll';
			this.isPullingDown = false;
			if (this.refreshIcon.shouldRefresh) {
				onRefresh && onRefresh();
				this.refreshIcon.reset();
			}
		}
	};

	render() {
		const {
			props: {
				style,
				children,
				onScrollStart,
				onScrollEnd,
				onEndReached,
				endReachedThreshold,
				onRefresh,
				throttle,
				disabled,
				...other
			},
			observer,
		} = this;
		const styled = { ...styles.main, ...style };
		if (disabled) styled.overflow = 'hidden';
		return (
			<ObserverContext.Provider value={observer}>
				<div
					{...other}
					style={styled}
					ref={this.scrollViewRef}
					onScroll={this.handleScroll}
					onTouchStart={this.handleTouchStart}
					onTouchMove={this.handleTouchMove}
					onTouchEnd={this.handleTouchEnd}
				>
					<div style={styles.refresh} ref={this.refreshRef}>
						<Arrow
							style={styles.refreshIcon}
							threshold={PullThreshold}
							ref={this.refreshIconRef}
						/>
					</div>
					{children}
					{isIOS && <span style={styles.background} />}
					<span ref={this.endRef} />
				</div>
			</ObserverContext.Provider>
		);
	}
}
