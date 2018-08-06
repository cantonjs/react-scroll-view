import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isIOS, debounce } from './util';
import Observer from './Observer';
import Intersection from './Intersection';
import RefreshControl from './RefreshControl';
import { ObserverContext } from './Contexts';

// TODO: should add [stickyheaderindices](https://facebook.github.io/react-native/docs/scrollview.html#stickyheaderindices) support

const styles = {
	main: {
		overflowY: isIOS ? 'scroll' : 'auto',
		position: 'relative',
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

const overflowStyle = styles.main.overflowY;

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
		innerRef: PropTypes.func,
		throttle: PropTypes.number,
		disabled: PropTypes.bool,
		refreshControl: PropTypes.bool,
		onRefresh: PropTypes.func,
		isRefreshing: PropTypes.bool,
		refreshControlColor: PropTypes.string,
		refreshControlStyle: PropTypes.object,
	};

	static defaultProps = {
		throttle: 0,
		endReachedThreshold: 0,
		disabled: false,
		isRefreshing: false,
		refreshControl: false,
		refreshControlColor: '#333',
	};

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
		const { onEndReached, isRefreshing } = this.props;
		if (onEndReached !== prevProps.onEndReached) {
			if (onEndReached) this.observeEndReached();
			else this.unobserveEndReached();
		}
		if (prevProps.isRefreshing && !isRefreshing) {
			const { refreshControl } = this;
			refreshControl.end();
			refreshControl.setHeight(0);
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

	refreshControlRef = (refreshControl) => {
		this.refreshControl = refreshControl;
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
		const { onTouchStart, refreshControl } = this.props;
		onTouchStart && onTouchStart(ev);
		if (!refreshControl) return;
		if (this.dom.scrollTop <= 0) {
			this.y0 = ev.touches[0].clientY;
		}
	};

	handleTouchMove = (ev) => {
		const { onTouchMove, refreshControl } = this.props;
		onTouchMove && onTouchMove(ev);
		if (!refreshControl) return;
		if (this.y0) {
			const dy = ev.touches[0].clientY - this.y0;
			if (dy > 0 && !this.isPullingDown) {
				this.refreshControl.start();
				this.dom.style.overflowY = 'hidden';
				this.isPullingDown = true;
			}
			else if (dy <= 0 && this.isPullingDown) {
				this.refreshControl.setHeight(0);
				this.dom.style.overflowY = overflowStyle;
				this.isPullingDown = false;
			}
			if (this.isPullingDown) {
				this.refreshControl.setHeight(dy);
			}
		}
	};

	handleTouchEnd = (ev) => {
		const { onTouchEnd, onRefresh, refreshControl, isRefreshing } = this.props;
		onTouchEnd && onTouchEnd(ev);
		if (!refreshControl) return;
		this.y0 = null;
		if (isRefreshing || this.isPullingDown) {
			const { refreshControl } = this;
			if (!isRefreshing && refreshControl.shouldRefresh) {
				onRefresh && onRefresh();
			}
			refreshControl.end();
			if (isRefreshing || refreshControl.shouldRefresh) {
				refreshControl.show();
			}
			else {
				refreshControl.setHeight(0);
			}
			this.dom.style.overflowY = overflowStyle;
			this.isPullingDown = false;
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
				isRefreshing,
				refreshControl,
				refreshControlColor,
				refreshControlStyle,
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
					{refreshControl && (
						<RefreshControl
							ref={this.refreshControlRef}
							isRefreshing={isRefreshing}
							color={refreshControlColor}
							style={refreshControlStyle}
						/>
					)}
					{children}
					{isIOS && <span style={styles.background} />}
					<span ref={this.endRef} />
				</div>
			</ObserverContext.Provider>
		);
	}
}
