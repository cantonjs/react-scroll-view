import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollObserver } from '../src';

export default class LazyElement extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	handleEnter = ({ direction }) => {
		console.log('on enter', direction);
	};

	handleLeave = ({ direction }) => {
		console.log('on leave', direction);
	};

	render() {
		const { children } = this.props;
		return (
			<ScrollObserver onEnter={this.handleEnter} onLeave={this.handleLeave}>
				{({ ref, isIntersecting }) => (
					<div
						ref={ref}
						style={{
							opacity: isIntersecting ? 1 : 0,
							transition: 'opacity 2s',
						}}
					>
						{children}
					</div>
				)}
			</ScrollObserver>
		);
	}
}
