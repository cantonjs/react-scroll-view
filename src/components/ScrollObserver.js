import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ObserverContext } from '../Contexts';
import Intersection from '../Intersection';
import { forwardRef } from '../util';
import { refType, thresholdType } from '../PropTypes';

export default class ScrollObserver extends Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		onEnter: PropTypes.func,
		onLeave: PropTypes.func,
		onIntersect: PropTypes.func,
		rootMargin: PropTypes.string,
		threshold: thresholdType,
		innerRef: refType,
	};

	state = {
		isIntersecting: false,
		ref: (dom) => {
			forwardRef(this.props.innerRef, dom);
			this.dom = dom;
		},
	};

	componentDidMount() {
		const {
			onEnter,
			onLeave,
			dom,
			props: { rootMargin, threshold, onIntersect },
		} = this;
		process.nextTick(() => {
			const intersection = new Intersection({ onEnter, onLeave, onIntersect });
			if (dom) {
				const options = { rootMargin, threshold };
				this.observer.observe(dom, intersection, options);
			}
		});
	}

	componentWillUnmount() {
		const { dom } = this;
		if (dom) this.observer.unobserve(dom);
	}

	onEnter = (...args) => {
		const { state: { isIntersecting }, props: { onEnter } } = this;
		!isIntersecting && this.setState({ isIntersecting: true });
		onEnter && onEnter(...args);
	};

	onLeave = (...args) => {
		const { state: { isIntersecting }, props: { onLeave } } = this;
		isIntersecting && this.setState({ isIntersecting: false });
		onLeave && onLeave(...args);
	};

	renderChildren = (observer) => {
		const { state, props: { children } } = this;
		this.observer = observer;
		return children(state);
	};

	render() {
		return (
			<ObserverContext.Consumer>{this.renderChildren}</ObserverContext.Consumer>
		);
	}
}
