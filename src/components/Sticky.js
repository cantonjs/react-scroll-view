import createStyles from './Sticky.styles';
import React, { Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { stickyNodeType } from '../PropTypes';
import { StickyContext } from '../Contexts';
import Fixed from './Fixed';

export default class Sticky extends Component {
	static propTypes = {
		children: stickyNodeType,
		style: PropTypes.object,
	};

	styles = createStyles();

	saveDOMNode = (dom) => {
		if (dom && !this.dom && this.stickyContext) {
			const { height } = dom.getBoundingClientRect();
			this.stickyContext.setStickyStyle({ height });
		}
		this.dom = dom;
	};

	returnChildren(position) {
		const { children } = this.props;
		return isValidElement(children) ? children : children(position);
	}

	renderChildren = (stickyContext) => {
		this.stickyContext = stickyContext;
		const { props: { style }, stickyContext: { position }, styles } = this;
		if (position === 'fixed') {
			return (
				<Fixed>
					<div ref={this.saveDOMNode} style={styles.fixed(style)}>
						{this.returnChildren(position)}
					</div>
				</Fixed>
			);
		}
		else {
			const topOrBottom = position;
			return (
				<div ref={this.saveDOMNode} style={styles.relative(style, topOrBottom)}>
					{this.returnChildren(position)}
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
