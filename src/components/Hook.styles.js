import { create } from '../Styles';

export default create({
	hook: (style) => ({
		pointerEvents: 'none',
		...style,
	}),
});
