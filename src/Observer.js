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
			entries.forEach((entry) => {
				const { target, isIntersecting } = entry;
				if (this.map.has(target)) {
					const intersection = this.map.get(target);
					const { isMounted } = intersection;
					if (!isMounted) intersection.mount();
					if (isIntersecting) intersection.onEnter();
					else if (isMounted) intersection.onLeave();
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

	observe(target, intersection) {
		if (intersection.isValid && !this.map.has(target)) {
			this.map.set(target, intersection);
			if (!this.observer) this.create();
			this.observer.observe(target);
		}
	}

	unobserve(target) {
		this.map.delete(target);
		this.observer.unobserve(target);
		if (!this.map.size) this.removeObserver();
	}
}
