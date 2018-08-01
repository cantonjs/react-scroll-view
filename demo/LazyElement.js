import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollObserver } from '../src';

export default class LazyElement extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	handleEnter = () => {
		console.log('on enter');
	};

	handleLeave = () => {
		console.log('on leave');
	};

	render() {
		const { children } = this.props;
		return (
			<ScrollObserver onEnter={this.handleEnter} onLeave={this.handleLeave}>
				{({ ref }) => <div ref={ref}>{children}</div>}
			</ScrollObserver>
		);
	}
}
