import createReactContext from 'create-react-context';

export const ObserverContext = createReactContext({
	ref: () => {},
	isIntersecting: true,
});

export const StickyContext = createReactContext();

export const FixedContext = createReactContext();
