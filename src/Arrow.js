import React from 'react';
import PropTypes from 'prop-types';

export default function Arrow({ color, ...other }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 40 40"
			width="32px"
			height="32px"
			{...other}
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
	);
}

Arrow.propTypes = {
	color: PropTypes.string.isRequired,
};
