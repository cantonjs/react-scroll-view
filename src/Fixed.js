import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { FixedContext } from './Contexts';

export default class Fixed extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	componentDidMount() {
		const { fixedContext, props: { children } } = this;
		if (fixedContext.mount) {
			fixedContext.mount(Children.only(children));
		}
	}

	componentDidUpdate() {
		// TODO:
	}

	componentWillUnmount() {
		const { fixedContext, props: { children } } = this;
		if (fixedContext.unmount) {
			fixedContext.unmount(children);
		}
	}

	renderChildren = (fixedContext) => {
		this.fixedContext = fixedContext;
		return null;
	};

	render() {
		return <FixedContext.Consumer>{this.renderChildren}</FixedContext.Consumer>;
	}
}
