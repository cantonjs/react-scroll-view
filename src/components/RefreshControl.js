import createStyles from './RefreshControl.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arrow from './Arrow';
import Loading from './Loading';
import RefreshControlObserver from './RefreshControlObserver';

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

	refreshObserverRef = (ref) => {
		this.control = ref.control;
	};

	render() {
		const { props: { color, style, ...other }, styles } = this;

		return (
			<RefreshControlObserver {...other} ref={this.refreshObserverRef}>
				{({ isRefreshing, shouldRefresh }) => (
					<div style={styles.iconContainer}>
						{isRefreshing ? (
							<Loading color={color} />
						) : (
							<Arrow color={color} style={styles.arrowIcon(shouldRefresh)} />
						)}
					</div>
				)}
			</RefreshControlObserver>
		);
	}
}
