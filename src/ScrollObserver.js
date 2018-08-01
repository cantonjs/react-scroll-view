import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default class ScrollObserver extends Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		onReached: PropTypes.func,
	};

	componentWillUnmount() {
		const { dom } = this;
		if (dom) this.observer.unobserve(dom);
	}

	ref = (dom) => {
		const { onReached } = this.props;
		this.dom = dom;
		if (onReached) this.observer.observe(dom, onReached);
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
