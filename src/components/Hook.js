import React from 'react';
import PropTypes from 'prop-types';
import ScrollObserver from './ScrollObserver';
import styles from '../styles';

export default function Hook({ onEnter, onLeave, style }) {
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

Hook.propTypes = {
	onEnter: PropTypes.func,
	onLeave: PropTypes.func,
	style: PropTypes.object,
};
