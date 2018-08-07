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
		this.prevScrollTop = 0;
		this.direction = 'down';
	}

	mount(root) {
		this.root = root;
	}

	create() {
		const { root } = this;
		const callback = (entries) =>
			entries.forEach((entry) => {
				const { target, isIntersecting } = entry;
				const { direction, map } = this;
				if (map.has(target)) {
					const intersection = map.get(target);
					const { isMounted } = intersection;
					if (!isMounted) intersection.mount();
					if (isIntersecting) intersection.onEnter(direction);
					else if (isMounted) intersection.onLeave(direction);
				}
			});
		this.observer = new IntersectionObserver(callback, { root });
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

	updateDirection(ev) {
		const { scrollTop } = ev.currentTarget;
		const { prevScrollTop } = this;
		this.direction = scrollTop < prevScrollTop ? 'up' : 'down';
		this.prevScrollTop = scrollTop;
	}
}
