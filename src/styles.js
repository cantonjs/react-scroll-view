import { isIOS } from './util';
import memoize from 'memoize-one';
import { PullThreshold } from './constants';

const styles = {
	container: memoize((style) => ({
		position: 'relative',
		height: 'inherit',
		width: 'inherit',
		...style,
	})),
	main: memoize((style, direction, disabled) => ({
		position: 'relative',
		[direction === 'vertical' ? 'overflowX' : 'overflowY']: 'hidden',
		[direction === 'vertical' ? 'overflowY' : 'overflowX']: disabled ?
			'hidden' :
			isIOS ? 'scroll' : 'auto',
		...style,
	})),
	background: memoize((direction) => {
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
	}),
	refreshControl: {
		height: 0,
		overflow: 'hidden',
		position: 'relative',
	},
	refreshControlIcon: {
		width: 100,
		height: 32,
		position: 'absolute',
		left: '50%',
		bottom: PullThreshold / 2 - 16,
		marginLeft: -50,
		textAlign: 'center',
	},
	fixedContainer: memoize((style) => ({
		...style,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: 0,
		zIndex: 666666,
	})),
	endHook: memoize((bottom) => ({
		position: 'relative',
		bottom,
	})),

	hook: memoize((style) => ({
		pointerEvents: 'none',
		...style,
	})),

	stickySectionContainer: memoize((style) => ({
		position: 'relative',
		...style,
	})),
	stickySectionTopHook: {
		position: 'absolute',
		top: 0,
	},
	stickySectionBottomHook: memoize((bottom = 0) => ({
		position: 'absolute',
		bottom,
	})),

	stickyFixed: {
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
	stickyRelative: memoize((topOrBottom) => ({
		position: 'absolute',
		zIndex: 1,
		left: 0,
		right: 0,
		[topOrBottom]: 0,
	})),
};

export default styles;
