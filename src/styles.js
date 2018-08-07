import { isIOS } from './util';
import { PullThreshold } from './constants';

const baseStyles = {
	main: {
		position: 'relative',
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: -1,
	},
};

if (isIOS) {
	baseStyles.main.WebkitOverflowScrolling = 'touch';
}

const styles = {
	vertical: {
		main: {
			...baseStyles.main,
			overflowX: 'hidden',
			overflowY: isIOS ? 'scroll' : 'auto',
		},
		background: {
			...baseStyles.background,
			width: '100%',
			height: 'calc(100% + 1px)',
		},
	},
	horizontal: {
		main: {
			...baseStyles.main,
			overflowX: isIOS ? 'scroll' : 'auto',
			overflowY: 'hidden',
		},
		background: {
			...baseStyles.background,
			width: 'calc(100% + 1px)',
			height: '100%',
		},
	},
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
};

export default styles;
