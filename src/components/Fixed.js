import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { FixedContext } from '../Contexts';
import { createId } from '../util';

export default class Fixed extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	constructor(props) {
		super(props);
		this.fixedId = createId();
	}

	componentDidMount() {
		this.renderInContext();
	}

	componentDidUpdate({ children }) {
		if (children !== this.props.children) {
			this.renderInContext();
		}
	}

	componentWillUnmount() {
		this.fixedContext.unmount(this.fixedId);
	}

	renderInContext() {
		const { fixedContext, fixedId, props: { children } } = this;
		if (fixedContext.render) {
			fixedContext.render(
				cloneElement(Children.only(children), { key: fixedId }),
			);
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
