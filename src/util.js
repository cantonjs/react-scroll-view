const iOSUserAgentRegExp = /(iphone|ipod|ipad)/i;
export const isIOS = iOSUserAgentRegExp.test(navigator.userAgent);

export const createId = function createId() {
	return (createId.id = (createId.id || 0) + 1);
};

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
