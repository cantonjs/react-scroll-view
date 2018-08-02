import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Arrow extends Component {
	static propTypes = {
		color: PropTypes.string,
		threshold: PropTypes.number.isRequired,
	};

	static defaultProps = {
		color: '#333',
	};

	shouldRefresh = false;

	setDelta(val) {
		const { shouldRefresh, props: { threshold } } = this;
		if (val > threshold && !shouldRefresh) {
			this.shouldRefresh = true;
			this.forceUpdate();
		}
		else if (val < threshold && shouldRefresh) {
			this.shouldRefresh = false;
			this.forceUpdate();
		}
	}

	reset() {
		this.shouldRefresh = false;
		this.forceUpdate();
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { props: { color, ...other }, shouldRefresh } = this;
		return (
			<div {...other}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 40 40"
					style={{
						transform: `rotateZ(${shouldRefresh ? 180 : 0}deg)`,
						transition: 'transform 0.3s',
					}}
				>
					<line
						x1="20"
						y1="4"
						x2="20"
						y2="32"
						strokeLinecap="round"
						strokeWidth={3}
						stroke={color}
					/>
					<polyline
						points="10 24 20 34 30 24"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={3}
						fill="none"
						stroke={color}
					/>
				</svg>
			</div>
		);
	}
}
