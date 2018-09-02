export default class FixedState {
	constructor(forceUpdate) {
		this.forceUpdate = forceUpdate;
		this.children = [];
	}

	render(child, prev) {
		const { children } = this;
		if (prev) {
			const index = children.indexOf(prev);
			if (index > -1) children.splice(index, 1, child);
		}
		else children.push(child);
		this.forceUpdate();
	}

	unmount(child) {
		const { children } = this;
		const index = children.indexOf(child);
		if (index > -1) {
			children.splice(index, 1);
			this.forceUpdate();
		}
	}
}
