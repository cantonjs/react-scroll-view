import { create } from '../Style';
import { PullThreshold } from '../constants';

export default create({
	iconContainer: {
		width: 100,
		height: 32,
		position: 'absolute',
		left: '50%',
		bottom: PullThreshold / 2 - 16,
		marginLeft: -50,
		textAlign: 'center',
	},
	arrowIcon: (isActive) => ({
		transform: `rotateZ(${isActive ? 180 : 0}deg)`,
		transition: 'transform 0.3s',
	}),
});
