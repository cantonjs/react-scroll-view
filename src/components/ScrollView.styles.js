import { isIOS } from '../util';
import { create } from '../Style';

export default create({
	container: (style) => ({
		position: 'relative',
		height: 'inherit',
		width: 'inherit',
		...style,
	}),
	main: (style, direction, disabled) => ({
		position: 'relative',
		[direction === 'vertical' ? 'overflowX' : 'overflowY']: 'hidden',
		[direction === 'vertical' ? 'overflowY' : 'overflowX']: disabled ?
			'hidden' :
			isIOS ? 'scroll' : 'auto',
		...style,
	}),
	background: (direction) => {
		const vertical = {
			width: '100%',
			height: 'calc(100% + 1px)',
		};
		const horizontal = {
			width: 'calc(100% + 1px)',
			height: '100%',
		};
		const style = direction === 'vertical' ? vertical : horizontal;
		return {
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: -1,
			...style,
		};
	},
	endHook: (bottom) => ({
		position: 'relative',
		bottom,
	}),
	fixedContainer: (style) => ({
		...style,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: 0,
		zIndex: 666666,
	}),
});
