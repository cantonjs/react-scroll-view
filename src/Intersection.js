export default class Intersection {
	constructor({ onEnter, onLeave }) {
		this.isValid = !!(onEnter || onLeave);
		if (!this.isValid) return this;
		this._onEnter = onEnter;
		this._onLeave = onLeave;
		this.isMounted = false;
	}

	mount() {
		this.isMounted = true;
	}

	onEnter(...args) {
		if (this._onEnter) return this._onEnter(...args);
	}

	onLeave(...args) {
		if (this._onLeave) return this._onLeave(...args);
	}
}
