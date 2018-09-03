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

	render(child, prev) {
		const { children } = this;
		if (prev) {
			const index = children.indexOf(prev);
			if (index > -1) children.splice(index, 1, child);
		}
		else children.push(child);
		this.forceUpdate && this.forceUpdate();
	}

	unmount(child) {
		const { children } = this;
		const index = children.indexOf(child);
		if (index > -1) {
			children.splice(index, 1);
			this.forceUpdate && this.forceUpdate();
		}
	}
}
