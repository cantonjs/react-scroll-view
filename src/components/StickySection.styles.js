import { create } from '../Style';

export default create({
	container: (style) => ({
		position: 'relative',
		...style,
	}),
	topHook: {
		position: 'absolute',
		top: 0,
	},
	bottomHook: (bottom = 0) => ({
		position: 'absolute',
		bottom,

		boxShadow: '0 0 0 2px red',
		top: 0,
		left: 0,
		right: 0,
		zIndex: -666,
	}),
	sticky: (zIndex) => ({ zIndex }),
});
