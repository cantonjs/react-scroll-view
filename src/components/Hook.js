import createStyles from './Hook.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollObserver from './ScrollObserver';

export default class Hook extends Component {
	static propTypes = {
		onEnter: PropTypes.func,
		onLeave: PropTypes.func,
		style: PropTypes.object,
	};

	styles = createStyles();

	render() {
		const { props: { onEnter, onLeave, style }, styles } = this;
		return (
			<ScrollObserver onEnter={onEnter} onLeave={onLeave}>
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
