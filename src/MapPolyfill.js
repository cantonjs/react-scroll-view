import { createId } from './util';

class MapPolyfill {
	constructor() {
		this._store = [];
		this._key = `__map${createId()}`;
	}

	has(obj) {
		return !!~this._store.indexOf(obj);
	}

	set(obj, val) {
		if (!this.has(obj)) {
			obj[this._key] = val;
			this._store.push(obj);
		}
	}

	get(obj) {
		if (this.has(obj)) return obj[this._key];
	}

	delete(obj) {
		const index = this._store.indexOf(obj);
		if (index > -1) {
			delete obj[this._key];
			this._store.splice(index, 1);
		}
	}

	get size() {
		return this._store.length;
	}
}

export default Map || MapPolyfill;
