import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyContext } from './Contexts';
import ScrollObserver from './ScrollObserver';

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
		const { props: { children, style, ...other }, state: { sticky } } = this;
		const stickyHeight = sticky.height || 0;
		return (
			<StickyContext.Provider value={this.state}>
				<div {...other} style={{ position: 'relative', ...style }}>
					<div style={sticky} />
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
