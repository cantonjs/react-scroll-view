import { PullThreshold } from './constants';

export default class RefreshState {
	constructor() {
		this.shouldRefresh = false;
	}

	mount(control) {
		this.control = control;
	}

	setHeight(val) {
		const max = PullThreshold;
		const height = val > 0 ? (val > max ? max + (val - max) / 2 : val) : 0;
		const { shouldRefresh, control } = this;
		control.dom.style.height = `${height}px`;
		if (height >= max && !shouldRefresh) {
			this.shouldRefresh = true;
			control.forceUpdate();
		}
		else if (height < max && shouldRefresh) {
			this.shouldRefresh = false;
			control.forceUpdate();
		}
	}

	show() {
		this.setHeight(PullThreshold);
	}

	start() {
		this.control.dom.style.transition = 'none';
	}

	end() {
		if (this.shouldRefresh) {
			this.shouldRefresh = false;
			this.control.dom.style.transition =
				'height 0.3s ease-out, min-height 0.3s ease-out';
			this.control.forceUpdate();
		}
	}

	attemptToRefresh() {
		const { onRefresh, isRefreshing } = this.control.props;
		if (onRefresh && !isRefreshing && this.shouldRefresh) {
			onRefresh();
		}
		this.end();
		if (isRefreshing || this.shouldRefresh) {
			this.show();
		}
		else {
			this.setHeight(0);
		}
	}
}
