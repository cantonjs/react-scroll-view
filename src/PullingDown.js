import { eventOptions } from './util';

export default class PullingDown {
	constructor(dom) {
		this._dom = dom;
		this.isActive = false;
	}

	start() {
		window.addEventListener(
			'touchmove',
			this._preventWindowScroll,
			eventOptions,
		);

		this.isActive = true;
		this._overflowStyle = this._dom.style.overflowY;
		this._dom.style.overflowY = 'hidden';
	}

	stop() {
		window.removeEventListener(
			'touchmove',
			this._preventWindowScroll,
			eventOptions,
		);

		this.isActive = false;
		this._dom.style.overflowY = this._overflowStyle;
	}

	_preventWindowScroll = (ev) => {
		ev.cancelable !== false && ev.preventDefault();
	};
}
