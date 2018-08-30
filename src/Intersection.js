import { noop } from './util';

export default class Intersection {
	constructor({ onEnter, onLeave, onIntersect }) {
		this._onIntersect = onIntersect || noop;
		this.onEnter = onEnter || noop;
		this.onLeave = onLeave || noop;
		this._isIntersecting = false;
	}

	onIntersect(entry, ...args) {
		const { isIntersecting } = entry;
		if (this._isIntersecting !== isIntersecting) {
			this._isIntersecting = isIntersecting;
			this[isIntersecting ? 'onEnter' : 'onLeave'](...args);
		}
		this._onIntersect(entry, ...args);
	}
}
