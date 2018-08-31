import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyContext } from './Contexts';
import Fixed from './Fixed';
import styles from './styles';

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
					<div style={styles.stickyFixed}>{children}</div>
				</Fixed>
			);
		}
		else {
			const topOrBottom = status;
			return (
				<div ref={this.saveDOMNode} style={styles.stickyRelative(topOrBottom)}>
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
