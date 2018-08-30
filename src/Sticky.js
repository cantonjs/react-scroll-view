import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyContext } from './Contexts';
import Fixed from './Fixed';

// IntersectionObserver.prototype.POLL_INTERVAL = 50;

export default class Sticky extends Component {
	static propTypes = {
		children: PropTypes.node,
		style: PropTypes.object,
		height: PropTypes.number,
	};

	componentDidMount() {
		const { stickyContext, props: { height } } = this;
		if (stickyContext) {
			stickyContext.setSticky({ height });
		}
	}

	saveStickyContext(stickyContext) {
		this.stickyContext = stickyContext;
	}

	saveDOMNode = (dom) => {
		this.dom = dom;
	};

	renderChildren = (stickyContext) => {
		this.saveStickyContext(stickyContext);
		const {
			props: { style, height, children, ...other },
			stickyContext: { status },
			dom,
		} = this;

		if (status === 'fixed') {
			const { left, width } = dom.getBoundingClientRect();
			return (
				<Fixed>
					<div
						{...other}
						style={{
							...style,
							position: 'absolute',
							top: 0,
							left,
							width,
							height,
						}}
					>
						{children}
					</div>
				</Fixed>
			);
		}
		else {
			// const { left, width } = dom.getBoundingClientRect();
			return (
				<div
					{...other}
					ref={this.saveDOMNode}
					style={{
						...style,
						height,
						position: 'absolute',
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
