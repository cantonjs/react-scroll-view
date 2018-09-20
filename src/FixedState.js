export default class FixedState {
	constructor() {
		this.children = [];
	}

	bind(reactInstance) {
		if (!this.forceUpdate) {
			this.forceUpdate = reactInstance.forceUpdate.bind(reactInstance);
		}
	}

	unbind() {
		this.forceUpdate = null;
	}

	_findIndexByKey(key) {
		const { children } = this;
		const { length } = children;
		let index = -1;
		for (let i = 0; i < length; i++) {
			const curr = children[i];
			if (curr && curr.key === key) {
				index = i;
				break;
			}
		}
		return index;
	}

	unmount(key) {
		const index = this._findIndexByKey(key);
		if (index > -1) {
			this.children.splice(index, 1);
			this.forceUpdate && this.forceUpdate();
		}
	}

	render(child) {
		const { children } = this;
		const { key } = child;
		const index = this._findIndexByKey(key);
		if (index > -1) children.splice(index, 1, child);
		else children.push(child);
		this.forceUpdate && this.forceUpdate();
	}
}
