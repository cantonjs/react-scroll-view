import { create } from '../Style';

export default create({
	hook: (style) => ({
		pointerEvents: 'none',
		...style,
	}),
});
