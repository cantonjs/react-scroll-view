import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arrow from './Arrow';
import Loading from './Loading';

const PullThreshold = 80;

const styles = {
	container: {
		height: 0,
		overflow: 'hidden',
		position: 'relative',
	},
	icon: {
		width: 100,
		height: 32,
		position: 'absolute',
		left: '50%',
		bottom: PullThreshold / 2 - 16,
		marginLeft: -50,
		textAlign: 'center',
	},
};

export default class RefreshControl extends Component {
	static propTypes = {
		isRefreshing: PropTypes.bool.isRequired,
		color: PropTypes.string.isRequired,
		style: PropTypes.object,
	};

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
		} = this;

		return (
			<div
				{...other}
				style={{
					...style,
					...styles.container,
					minHeight: isRefreshing ? PullThreshold : 0,
				}}
				ref={this.domRef}
			>
				<div style={styles.icon}>
					{isRefreshing ? (
						<Loading color={color} />
					) : (
						<Arrow
							color={color}
							style={{
								transform: `rotateZ(${shouldRefresh ? 180 : 0}deg)`,
								transition: 'transform 0.3s',
							}}
						/>
					)}
				</div>
			</div>
		);
	}
}
