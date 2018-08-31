import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyContext } from './Contexts';
import Hook from './Hook';

export default class StickySection extends Component {
	static propTypes = {
		children: PropTypes.node,
		style: PropTypes.object,
	};

	state = {
		stickyStyle: {},
		isIntersecting: false,
		status: 'top',
		setStickyStyle: (stickyStyle) => {
			this.setState({ stickyStyle });
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

	render() {
		const {
			props: { children, style, ...other },
			state: { stickyStyle },
		} = this;
		const stickyHeight = stickyStyle.height || 0;
		return (
			<StickyContext.Provider value={this.state}>
				<div {...other} style={{ position: 'relative', ...style }}>
					<div style={stickyStyle} />
					<Hook
						onEnter={this.handleTopEnter}
						onLeave={this.handleTopLeave}
						style={{
							position: 'absolute',
							top: 0,
						}}
					/>
					{children}
					<Hook
						onEnter={this.handleBottomEnter}
						onLeave={this.handleBottomLeave}
						style={{
							position: 'absolute',
							bottom: stickyHeight,
						}}
					/>
				</div>
			</StickyContext.Provider>
		);
	}
}
