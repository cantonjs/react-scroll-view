import Map from './MapPolyfill';

if (!IntersectionObserver) {
	throw new Error(
		'react-scroll-view requires `IntersectionObserver`. You may add this polyfill to fix the issue. `https://github.com/w3c/IntersectionObserver/tree/master/polyfill`',
	);
}

export default class Observer {
	constructor() {
		this.observer = null;
		this.map = new Map();
	}

	mount(root, rootMargin) {
		this.root = root;
		this.rootMargin = rootMargin;
	}

	create() {
		const { root, rootMargin } = this;
		const callback = (entries) =>
			entries.forEach(({ isIntersecting, target }) => {
				if (isIntersecting && this.map.has(target)) {
					const fn = this.map.get(target);
					fn();
				}
			});
		this.observer = new IntersectionObserver(callback, {
			root,
			rootMargin,
		});
	}

	removeObserver() {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
		}
	}

	observe(target, callback) {
		this.map.set(target, callback);
		if (!this.observer) this.create();
		this.observer.observe(target);
	}

	unobserve(target) {
		this.map.delete(target);
		this.observer.unobserve(target);
		if (!this.map.size) this.removeObserver();
	}
}
