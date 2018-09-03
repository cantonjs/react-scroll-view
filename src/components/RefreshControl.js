import createStyles from './RefreshControl.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arrow from './Arrow';
import Loading from './Loading';
import { PullThreshold } from '../constants';

export default class RefreshControl extends Component {
	static propTypes = {
		isRefreshing: PropTypes.bool.isRequired,
		color: PropTypes.string.isRequired,
		style: PropTypes.object,
	};

	styles = createStyles();

	shouldRefresh = false;

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
		this.shouldRefresh = false;
		this.dom.style.transition =
			'height 0.3s ease-out, min-height 0.3s ease-out';
		this.forceUpdate();
	}

	render() {
		const {
			props: { color, style, isRefreshing, ...other },
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
