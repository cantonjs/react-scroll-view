import { create } from '../Style';

export default create({
	fixed: {
		position: 'absolute',
		top: 0,
		// width: 'inherit',
		left: 'inherit',
		right: 'inherit',
		paddingLeft: 'inherit',
		paddingRight: 'inherit',
		marginLeft: 'inherit',
		marginRight: 'inherit',
	},
	relative: (topOrBottom) => ({
		position: 'absolute',
		zIndex: 1,
		left: 0,
		right: 0,
		[topOrBottom]: 0,
	}),
});
