import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyContext } from './Contexts';
import Hook from './Hook';
import styles from './styles';

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
				<div {...other} style={styles.stickySectionContainer(style)}>
					<div style={stickyStyle} />
					<Hook
						onEnter={this.handleTopEnter}
						onLeave={this.handleTopLeave}
						style={styles.stickySectionTopHook}
					/>
					{children}
					<Hook
						onEnter={this.handleBottomEnter}
						onLeave={this.handleBottomLeave}
						style={styles.stickySectionBottomHook(stickyHeight)}
					/>
				</div>
			</StickyContext.Provider>
		);
	}
}
