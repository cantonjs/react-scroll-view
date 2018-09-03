import memoize from 'memoize-one';

export function create(styles) {
	return function createStyle() {
		return Object.keys(styles).reduce((finalStyles, key) => {
			const val = styles[key];
			finalStyles[key] = typeof val === 'function' ? memoize(val) : val;
			return finalStyles;
		}, {});
	};
}
