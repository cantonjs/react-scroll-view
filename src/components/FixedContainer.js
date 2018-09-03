import React, { Component } from 'react';
import { FixedContext } from '../Contexts';

export default class FixedContainer extends Component {
	componentWillUnmount() {
		this.fixedState.unbind();
	}

	renderChildren = (fixedState) => {
		this.fixedState = fixedState;
		this.unbind = fixedState.bind(this);
		return <div {...this.props}>{fixedState.children}</div>;
	};

	render() {
		return <FixedContext.Consumer>{this.renderChildren}</FixedContext.Consumer>;
	}
}
