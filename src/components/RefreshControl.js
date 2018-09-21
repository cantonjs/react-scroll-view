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

	render() {
		const { props: { color, ...other }, styles } = this;

		return (
			<RefreshControlObserver {...other}>
				{({ isRefreshing, isActive }) => (
					<div style={styles.iconContainer}>
						{isRefreshing ? (
							<Loading color={color} />
						) : (
							<Arrow color={color} style={styles.arrowIcon(isActive)} />
						)}
					</div>
				)}
			</RefreshControlObserver>
		);
	}
}
