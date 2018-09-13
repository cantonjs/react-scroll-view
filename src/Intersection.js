import { noop } from './util';

export default class Intersection {
	constructor({ onEnter, onLeave, onIntersect, debugId = '' }) {
		this._onIntersect = onIntersect || noop;
		this.onEnter = onEnter || noop;
		this.onLeave = onLeave || noop;
		this._isIntersecting = false;
		this.debugId = debugId; // useful for debug
	}

	onIntersect(eventData) {
		const { entry } = eventData;
		const { isIntersecting } = entry;
		const { debugId } = this;
		const eventState = { debugId };
		if (this._isIntersecting !== isIntersecting) {
			this._isIntersecting = isIntersecting;
			this[isIntersecting ? 'onEnter' : 'onLeave'](eventData, eventState);
		}
		this._onIntersect(eventData, eventState);
	}
}
