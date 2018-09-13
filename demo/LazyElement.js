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
