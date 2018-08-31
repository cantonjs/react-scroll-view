import React from 'react';
import PropTypes from 'prop-types';
import ScrollObserver from './ScrollObserver';

export default function Hook({ onEnter, onLeave, style }) {
	return (
		<ScrollObserver onEnter={onEnter} onLeave={onLeave}>
			{({ ref }) => (
				<div
					role="none"
					aria-label="react-scroll-hook"
					ref={ref}
					style={{ ...style, pointerEvents: 'none' }}
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
