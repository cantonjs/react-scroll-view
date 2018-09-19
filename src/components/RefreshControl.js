import createStyles from './RefreshControl.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arrow from './Arrow';
import Loading from './Loading';
import { PullThreshold } from '../constants';

export default class RefreshControl extends Component {
	static propTypes = {
		isRefreshing: PropTypes.bool.isRequired,
		onRefresh: PropTypes.func,
		color: PropTypes.string,
		style: PropTypes.object,
	};

	static defaultProps = {
		color: '#333',
	};

	styles = createStyles();

	shouldRefresh = false;

	componentDidUpdate(prevProps) {
		const { isRefreshing } = this.props;
		if (prevProps.isRefreshing && !isRefreshing) {
			this.end();
			this.setHeight(0);
		}
	}

	domRef = (dom) => (this.dom = dom);

	setHeight(val) {
		const max = PullThreshold;
		const height = val > 0 ? (val > max ? max + (val - max) / 2 : val) : 0;
		const { shouldRefresh } = this;
		this.dom.style.height = `${height}px`;
		if (height >= max && !shouldRefresh) {
			this.shouldRefresh = true;
			this.forceUpdate();
		}
		else if (height < max && shouldRefresh) {
			this.shouldRefresh = false;
			this.forceUpdate();
		}
	}

	show() {
		this.setHeight(PullThreshold);
	}

	start() {
		this.dom.style.transition = 'none';
	}

	end() {
		if (this.shouldRefresh) {
			this.shouldRefresh = false;
			this.dom.style.transition =
				'height 0.3s ease-out, min-height 0.3s ease-out';
			this.forceUpdate();
		}
	}

	attemptToRefresh() {
		const { onRefresh, isRefreshing } = this.props;
		if (onRefresh && !isRefreshing && this.shouldRefresh) {
			onRefresh();
		}
		this.end();
		if (isRefreshing || this.shouldRefresh) {
			this.show();
		}
		else {
			this.setHeight(0);
		}
	}

	render() {
		const {
			props: { color, style, isRefreshing, onRefresh, ...other },
			shouldRefresh,
			styles,
		} = this;

		return (
			<div
				{...other}
				style={styles.container(style, isRefreshing)}
				ref={this.domRef}
			>
				<div style={styles.iconContainer}>
					{isRefreshing ? (
						<Loading color={color} />
					) : (
						<Arrow color={color} style={styles.arrowIcon(shouldRefresh)} />
					)}
				</div>
			</div>
		);
	}
}
