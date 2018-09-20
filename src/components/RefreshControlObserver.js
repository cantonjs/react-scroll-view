import createStyles from './RefreshControlObserver.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { PullThreshold } from '../constants';
import { RefreshContext } from '../Contexts';

export default class RefreshControlObserver extends Component {
	static propTypes = {
		isRefreshing: PropTypes.bool.isRequired,
		onRefresh: PropTypes.func,
		style: PropTypes.object,
		children: PropTypes.func.isRequired,
	};

	styles = createStyles();

	control = this;

	shouldRefresh = false;

	componentDidUpdate(prevProps) {
		const { isRefreshing } = this.props;
		if (prevProps.isRefreshing && !isRefreshing) {
			this.end();
			this.setHeight(0);
		}
	}

	domRef = (dom) => {
		this.dom = dom;
	};

	// setHeight(val) {
	// 	const max = PullThreshold;
	// 	const height = val > 0 ? (val > max ? max + (val - max) / 2 : val) : 0;
	// 	const { shouldRefresh } = this;
	// 	this.dom.style.height = `${height}px`;
	// 	if (height >= max && !shouldRefresh) {
	// 		this.shouldRefresh = true;
	// 		this.forceUpdate();
	// 	}
	// 	else if (height < max && shouldRefresh) {
	// 		this.shouldRefresh = false;
	// 		this.forceUpdate();
	// 	}
	// }

	// show() {
	// 	this.setHeight(PullThreshold);
	// }

	// start() {
	// 	this.dom.style.transition = 'none';
	// }

	// end() {
	// 	if (this.shouldRefresh) {
	// 		this.shouldRefresh = false;
	// 		this.dom.style.transition =
	// 			'height 0.3s ease-out, min-height 0.3s ease-out';
	// 		this.forceUpdate();
	// 	}
	// }

	// attemptToRefresh() {
	// 	const { onRefresh, isRefreshing } = this.props;
	// 	if (onRefresh && !isRefreshing && this.shouldRefresh) {
	// 		onRefresh();
	// 	}
	// 	this.end();
	// 	if (isRefreshing || this.shouldRefresh) {
	// 		this.show();
	// 	}
	// 	else {
	// 		this.setHeight(0);
	// 	}
	// }

	// render() {
	// 	const {
	// 		props: { children, style, isRefreshing, onRefresh, ...other },
	// 		shouldRefresh,
	// 		styles,
	// 	} = this;

	// 	return (
	// 		<div
	// 			{...other}
	// 			style={styles.container(style, isRefreshing)}
	// 			ref={this.domRef}
	// 		>
	// 			{children({ isRefreshing, shouldRefresh })}
	// 		</div>
	// 	);
	// }

	renderChildren = (refreshState) => {
		if (!this.refreshState) refreshState.mount(this);
		this.refreshState = refreshState;

		const {
			props: { children, style, isRefreshing, onRefresh, ...other },
			shouldRefresh,
			styles,
		} = this;

		return (
			<div
				{...other}
				style={styles.container(style, isRefreshing)}
				ref={this.domRef}
			>
				{children({ isRefreshing, shouldRefresh })}
			</div>
		);
	};

	render() {
		return (
			<RefreshContext.Consumer>{this.renderChildren}</RefreshContext.Consumer>
		);
	}
}
