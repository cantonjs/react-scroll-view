import createStyles from './Hook.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollObserver from './ScrollObserver';

export default class Hook extends Component {
	static propTypes = {
		style: PropTypes.object,
	};

	styles = createStyles();

	render() {
		const { props: { style, ...other }, styles } = this;
		return (
			<ScrollObserver {...other}>
				{({ ref }) => (
					<div
						role="none"
						aria-label="react-scroll-hook"
						ref={ref}
						style={styles.hook(style)}
					/>
				)}
			</ScrollObserver>
		);
	}
}
