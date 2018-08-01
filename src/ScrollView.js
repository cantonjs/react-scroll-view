import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isIOS, debounce } from './util';
import Observer from './Observer';
import Context from './Context';

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

if (isIOS) {
	styles.main.WebkitOverflowScrolling = 'touchscroll';
}

export default class ScrollView extends Component {
	static propTypes = {
		style: PropTypes.object,
		children: PropTypes.node,
		onScrollStart: PropTypes.func,
		onScroll: PropTypes.func,
		onScrollEnd: PropTypes.func,
		onEndReached: PropTypes.func,
		endReachedThreshold: PropTypes.number,
		innerRef: PropTypes.func,
		throttle: PropTypes.number,
	};

	static defaultProps = {
		throttle: 0,
		endReachedThreshold: 0,
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

	observeEndReached() {
		const { end, props: { onEndReached } } = this;
		if (onEndReached) {
			this.observer.observe(end, onEndReached);
		}
	}

	unobserveEndReached() {
		this.observer.observe(this.end);
	}

	handleScroll = (ev) => {
		const { props: { onScrollStart, onScroll }, isScrolling } = this;
		if (!isScrolling) {
			this.isScrolling = true;
			onScrollStart && onScrollStart(ev);
		}
		onScroll && onScroll(ev);
		this.toEmitOnScrollEnd(ev);
	};

	emitEnd() {
		const { onEndReached } = this.props;
		onEndReached && onEndReached();
	}

	render() {
		const {
			props: {
				style,
				children,
				onScrollStart,
				onScrollEnd,
				onEndReached,
				endReachedThreshold,
				throttle,
				...other
			},
			observer,
		} = this;
		return (
			<Context.Provider value={observer}>
				<div
					{...other}
					style={{ ...styles.main, ...style }}
					ref={this.scrollViewRef}
					onScroll={this.handleScroll}
				>
					{children}
					{isIOS && <span style={styles.background} />}
					<span ref={this.endRef} />
				</div>
			</Context.Provider>
		);
	}
}
