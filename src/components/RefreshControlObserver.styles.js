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
});
