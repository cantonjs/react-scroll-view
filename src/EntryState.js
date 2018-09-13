export default class EntryState {
	constructor(entry, debugId) {
		this.entry = entry;
		this.debugId = debugId;
	}

	get isOffsetTop() {
		const { entry } = this;
		return (
			!entry.isIntersecting &&
			entry.boundingClientRect.bottom < entry.rootBounds.bottom
		);
	}

	get isOffsetBottom() {
		const { entry } = this;
		return (
			!entry.isIntersecting &&
			entry.boundingClientRect.bottom > entry.rootBounds.bottom
		);
	}

	get isTopVisible() {
		const { entry } = this;
		return (
			entry.isIntersecting &&
			entry.boundingClientRect.top >= entry.rootBounds.top
		);
	}

	get isBottomVisible() {
		const { entry } = this;
		return (
			entry.isIntersecting &&
			entry.boundingClientRect.bottom <= entry.rootBounds.bottom
		);
	}

	get isTopEdge() {
		const { entry } = this;
		return (
			entry.isIntersecting &&
			entry.boundingClientRect.top === entry.rootBounds.top
		);
	}

	get isBottomEdge() {
		const { entry } = this;
		return (
			entry.isIntersecting &&
			entry.boundingClientRect.bottom === entry.rootBounds.bottom
		);
	}
}
