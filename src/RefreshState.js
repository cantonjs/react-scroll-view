export default class RefreshState {
	mount(reactInstance) {
		this.reactInstance = reactInstance;
	}

	unmount() {
		this.reactInstance = null;
	}

	call(method, ...args) {
		if (this.reactInstance) {
			this.reactInstance[method](...args);
		}
	}
}
