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
	}),
});
