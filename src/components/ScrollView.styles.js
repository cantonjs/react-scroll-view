import { isIOS } from '../util';
import { create } from '../Style';

export default create({
	container: (style) => ({
		position: 'relative',
		...style,
	}),
	main: (direction, disabled) => {
		const overflowHidden = direction === 'vertical' ? 'overflowX' : 'overflowY';
		const overflowScroll = direction === 'vertical' ? 'overflowY' : 'overflowX';
		const res = {
			// all: 'inherit',
			position: 'relative',
			height: '100%',
			width: '100%',
			[overflowHidden]: 'hidden',
			[overflowScroll]: disabled ? 'hidden' : isIOS ? 'scroll' : 'auto',
		};
		if (isIOS) res.WebkitOverflowScrolling = 'touch';
		return res;
	},
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
