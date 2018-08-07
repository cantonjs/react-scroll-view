import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ObserverContext } from './Contexts';
import Intersection from './Intersection';
import { forwardRef, refType } from './util';

export default class ScrollObserver extends Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		onEnter: PropTypes.func,
		onLeave: PropTypes.func,
		innerRef: refType,
	};

	state = {
		isIntersecting: false,
		ref: (dom) => {
			const { onEnter, onLeave, props: { innerRef } } = this;
			forwardRef(innerRef, dom);
			this.dom = dom;
			const intersection = new Intersection({ onEnter, onLeave });
			if (dom) this.observer.observe(dom, intersection);
		},
	};

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
