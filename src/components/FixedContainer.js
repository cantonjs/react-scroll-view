import React, { Component } from 'react';
import { FixedContext } from '../Contexts';

export default class FixedContainer extends Component {
	componentWillUnmount() {
		this.fixedState.unbind();
	}

	renderChildren = (fixedState) => {
		this.fixedState = fixedState;
		this.unbind = fixedState.bind(this);
		const { children } = fixedState;
		return children.length ? <div {...this.props}>{children}</div> : null;
	};

	render() {
		return <FixedContext.Consumer>{this.renderChildren}</FixedContext.Consumer>;
	}
}
