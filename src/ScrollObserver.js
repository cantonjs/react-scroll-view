import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import Intersection from './Intersection';

export default class ScrollObserver extends Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		onEnter: PropTypes.func,
		onLeave: PropTypes.func,
	};

	componentWillUnmount() {
		const { dom } = this;
		if (dom) this.observer.unobserve(dom);
	}

	ref = (dom) => {
		const { onEnter, onLeave } = this.props;
		this.dom = dom;
		const intersection = new Intersection({ onEnter, onLeave });
		this.observer.observe(dom, intersection);
	};

	renderChildren = (observer) => {
		const { ref, props: { children } } = this;
		this.observer = observer;
		return children({ ref });
	};

	render() {
		return <Context.Consumer>{this.renderChildren}</Context.Consumer>;
	}
}
