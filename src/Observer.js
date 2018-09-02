import Map from './MapPolyfill';
import warning from 'warning';
import Intersection from './Intersection';

if (!IntersectionObserver) {
	throw new Error(
		[
			'react-scroll-view requires `IntersectionObserver`.',
			'You may add this polyfill to fix the issue.',
			'`https://github.com/w3c/IntersectionObserver/tree/master/polyfill`',
		].join(' '),
	);
}

const createBox = (observer, intersection) => ({
	observer,
	intersection,
});

export default class Observer {
	constructor() {
		this._boxes = new Map();
		this.prevScrollTop = 0;
		this.direction = 'down';
	}

	mount(root) {
		this.root = root;
	}

	observe(target, intersection, options) {
		if (!this.root) {
			return warning(
				false,
				'Should call observer.mount(root) before calling observer.observe()',
			);
		}

		if (intersection instanceof Intersection && !this._boxes.has(target)) {
			const callback = (entries) =>
				entries.forEach((entry) => {
					const { target } = entry;
					const { direction, _boxes } = this;
					if (_boxes.has(target)) {
						const { intersection } = _boxes.get(target);
						intersection.onIntersect(entry, { direction });
					}
				});
			const observer = new IntersectionObserver(callback, {
				root: this.root,
				...options,
			});
			const box = createBox(observer, intersection);
			this._boxes.set(target, box);
			observer.observe(target);
		}
	}

	unobserve(target) {
		const box = this._boxes.get(target);
		if (box) {
			const { observer } = box;
			observer.unobserve(target);
			observer.disconnect();
			this._boxes.delete(target);
		}
	}

	updateDirection(ev) {
		const { scrollTop } = ev.currentTarget;
		const { prevScrollTop } = this;
		this.direction = scrollTop < prevScrollTop ? 'up' : 'down';
		this.prevScrollTop = scrollTop;
	}
}
