import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollObserver } from '../src';

export default class LazyElement extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	handleReached = () => {
		console.log('on reached');
	};

	render() {
		const { children } = this.props;
		return (
			<ScrollObserver onReached={this.handleReached}>
				{({ ref }) => <div ref={ref}>{children}</div>}
			</ScrollObserver>
		);
	}
}
