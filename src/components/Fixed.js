import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { FixedContext } from '../Contexts';

export default class Fixed extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	componentDidMount() {
		this.renderInContext();
	}

	componentDidUpdate({ children }) {
		if (children !== this.props.children) {
			this.renderInContext(children);
		}
	}

	componentWillUnmount() {
		const { fixedContext, props: { children } } = this;
		if (fixedContext.unmount) {
			fixedContext.unmount(children);
		}
	}

	renderInContext(prevChildren) {
		const { fixedContext, props: { children } } = this;
		if (fixedContext.render) {
			fixedContext.render(Children.only(children), prevChildren);
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
