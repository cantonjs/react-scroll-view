import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyContext } from './Contexts';
import Fixed from './Fixed';

export default class Sticky extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	saveDOMNode = (dom) => {
		if (!this.dom && this.stickyContext) {
			const { height } = dom.getBoundingClientRect();
			this.stickyContext.setStickyStyle({ height });
		}
		this.dom = dom;
	};

	renderChildren = (stickyContext) => {
		this.stickyContext = stickyContext;
		const { props: { children }, stickyContext: { status } } = this;

		if (status === 'fixed') {
			return (
				<Fixed>
					<div
						style={{
							position: 'absolute',
							top: 0,
							// width: 'inherit',
							left: 'inherit',
							right: 'inherit',
							paddingLeft: 'inherit',
							paddingRight: 'inherit',
							marginLeft: 'inherit',
							marginRight: 'inherit',
						}}
					>
						{children}
					</div>
				</Fixed>
			);
		}
		else {
			return (
				<div
					ref={this.saveDOMNode}
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						[status]: 0,
					}}
				>
					{children}
				</div>
			);
		}
	};

	render() {
		return (
			<StickyContext.Consumer>{this.renderChildren}</StickyContext.Consumer>
		);
	}
}
