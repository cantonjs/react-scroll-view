import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyContext } from './Contexts';
import Fixed from './Fixed';

export default class Sticky extends Component {
	static propTypes = {
		children: PropTypes.node,
		style: PropTypes.object,
	};

	saveDOMNode = (dom) => {
		if (!this.dom && this.stickyContext) {
			const { left, right, width, height } = dom.getBoundingClientRect();
			this.stickyContext.setStickyStyle({ left, right, width, height });
		}
		this.dom = dom;
	};

	renderChildren = (stickyContext) => {
		this.stickyContext = stickyContext;
		const {
			props: { style, children, ...other },
			stickyContext: { status },
		} = this;

		if (status === 'fixed') {
			return (
				<Fixed>
					<div
						{...other}
						style={{
							...style,
							...stickyContext.stickyStyle,
							position: 'absolute',
							top: 0,
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
					{...other}
					ref={this.saveDOMNode}
					style={{
						...style,
						...stickyContext.stickyStyle,
						position: 'absolute',
						left: 0,
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
