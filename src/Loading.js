import React from 'react';
import PropTypes from 'prop-types';

export default function Loading({ color }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 40 40"
			width="32px"
			height="32px"
		>
			<circle cx="6" cy="19" r="3" fill={color} />
			<circle cx="20" cy="19" r="3" fill={color} />
			<circle cx="34" cy="19" r="3" fill={color} />
		</svg>
	);
}

Loading.propTypes = {
	color: PropTypes.string,
};

Loading.defaultProps = {
	color: '#333',
};
