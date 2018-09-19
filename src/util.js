const iOSUserAgentRegExp = /(iphone|ipod|ipad)/i;
export const isIOS = iOSUserAgentRegExp.test(navigator.userAgent);

export const createId = function createId() {
	return (createId.id = (createId.id || 0) + 1);
};

export const noop = () => {};

export function debounce(func, wait) {
	let timeoutId;
	let timestamp;
	let args;
	let result;

	const later = () => {
		const last = Date.now() - timestamp;
		if (last < wait && last >= 0) {
			timeoutId = setTimeout(later, wait - last);
		}
		else {
			timeoutId = null;
			result = func(...args);
			args = null;
		}
	};

	const debounced = (...latestArgs) => {
		args = latestArgs;
		timestamp = Date.now();
		if (!timeoutId) {
			timeoutId = setTimeout(later, wait);
		}
		return result;
	};

	debounced.clearDebounce = () => {
		timeoutId && clearTimeout(timeoutId);
	};

	return debounced;
}

export function forwardRef(ref, dom) {
	if (ref) {
		typeof ref === 'function' ? ref(dom) : (ref.current = dom);
	}
}

export const eventOptions = (function getEventOptions() {
	let passiveOptionSupported = false;
	const opts = Object.defineProperty({}, 'passive', {
		get: () => (passiveOptionSupported = true),
	});
	try {
		window.addEventListener('test', null, opts);
	}
	catch (e) {}

	if (passiveOptionSupported) {
		return {
			passive: false,
			capture: false,
		};
	}
	return false;
})();
