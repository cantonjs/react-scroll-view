import { create } from '../Style';
import { PullThreshold } from '../constants';

export default create({
	container: (style, isRefreshing) => ({
		...style,
		height: 0,
		overflow: 'hidden',
		position: 'relative',
		minHeight: isRefreshing ? PullThreshold : 0,
	}),
	iconContainer: {
		width: 100,
		height: 32,
		position: 'absolute',
		left: '50%',
		bottom: PullThreshold / 2 - 16,
		marginLeft: -50,
		textAlign: 'center',
	},
	arrowIcon: (shouldRefresh) => ({
		transform: `rotateZ(${shouldRefresh ? 180 : 0}deg)`,
		transition: 'transform 0.3s',
	}),
});
