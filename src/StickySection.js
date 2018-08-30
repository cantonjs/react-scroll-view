import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyContext } from './Contexts';
import ScrollObserver from './ScrollObserver';

const threshold = [0, 1];

export default class StickySection extends Component {
	static propTypes = {
		children: PropTypes.node,
		style: PropTypes.object,
	};

	state = {
		sticky: {},
		isIntersecting: false,
		status: 'top',
		setSticky: (sticky) => {
			this.setState({ sticky });
		},
	};

	handleIntersect = (entry) => {
		const { isIntersecting, boundingClientRect, intersectionRect } = entry;
		const { state } = this;
		console.log('isIntersecting', isIntersecting, this.state.isIntersecting);
		const newState = {};
		if (isIntersecting !== state.isIntersecting) {
			newState.isIntersecting = isIntersecting;
			if (isIntersecting) {
				if (
					boundingClientRect.top === intersectionRect.top &&
					state.isIntersecting !== 'top'
				) {
					newState.status = 'top';
				}
			}
		}
		if (
			boundingClientRect.top < intersectionRect.top &&
			state.isIntersecting !== 'fixed'
		) {
			newState.status = 'fixed';
		}
		else if (state.isIntersecting !== 'top') {
			newState.status = 'top';
		}
		if (Object.keys(newState).length) {
			this.setState(newState);
		}
	};

	handleTopEnter = (direction) => {
		if (direction === 'up') {
			this.setState({ status: 'top' });
		}
	};

	handleTopLeave = (direction) => {
		if (direction === 'down') {
			this.setState({ status: 'fixed' });
		}
	};

	handleBottomEnter = (direction) => {
		if (direction === 'up') {
			this.setState({ status: 'fixed' });
		}
	};

	handleBottomLeave = (direction) => {
		if (direction === 'down') {
			this.setState({ status: 'bottom' });
		}
	};

	renderChildren = ({ ref }) => {
		const {
			props: { children, style, ...other },
			state: { sticky, status },
		} = this;
		return (
			<div {...other} ref={ref} style={{ position: 'relative', ...style }}>
				{status !== 'top' && <div style={sticky} />}
				{children}
			</div>
		);
	};

	render() {
		const {
			props: { children, style, ...other },
			state: { sticky, status },
		} = this;
		const stickyHeight = sticky.height || 0;
		return (
			<StickyContext.Provider value={this.state}>
				<div {...other} style={{ position: 'relative', ...style }}>
					{status !== 'top' && <div style={sticky} />}
					<ScrollObserver
						onLeave={this.handleTopLeave}
						onEnter={this.handleTopEnter}
					>
						{({ ref }) => (
							<div ref={ref} style={{ position: 'absolute', top: 0 }} />
						)}
					</ScrollObserver>
					{children}
					<ScrollObserver
						onLeave={this.handleBottomLeave}
						onEnter={this.handleBottomEnter}
					>
						{({ ref }) => (
							<div
								ref={ref}
								style={{ position: 'absolute', bottom: stickyHeight }}
							/>
						)}
					</ScrollObserver>
				</div>
			</StickyContext.Provider>
		);
	}
}
