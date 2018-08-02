import createReactContext from 'create-react-context';

export const ObserverContext = createReactContext({
	ref: () => {},
	isIntersecting: true,
});
