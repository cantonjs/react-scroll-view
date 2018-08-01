import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import Intersection from './Intersection';

export default class ScrollObserver extends Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		onEnter: PropTypes.func,
		onLeave: PropTypes.func,
		innerRef: PropTypes.func,
	};

	state = {
		isIntersecting: false,
		ref: (dom) => {
			const { onEnter, onLeave, props: { innerRef } } = this;
			innerRef && innerRef(dom);
			this.dom = dom;
			const intersection = new Intersection({ onEnter, onLeave });
			this.observer.observe(dom, intersection);
		},
	};

	componentWillUnmount() {
		const { dom } = this;
		if (dom) this.observer.unobserve(dom);
	}
	onEnter = () => {
		const { state: { isIntersecting }, props: { onEnter } } = this;
		!isIntersecting && this.setState({ isIntersecting: true });
		onEnter && onEnter();
	};

	onLeave = () => {
		const { state: { isIntersecting }, props: { onLeave } } = this;
		isIntersecting && this.setState({ isIntersecting: false });
		onLeave && onLeave();
	};

	renderChildren = (observer) => {
		const { state, props: { children } } = this;
		this.observer = observer;
		return children(state);
	};

	render() {
		return <Context.Consumer>{this.renderChildren}</Context.Consumer>;
	}
}
