import createStyles from './StickySection.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyContext } from '../Contexts';
import Hook from './Hook';
import Sticky from './Sticky';
import ScrollObserver from './ScrollObserver';

export default class StickySection extends Component {
	static propTypes = {
		children: PropTypes.node,
		sticky: PropTypes.node,
		style: PropTypes.object,
		stickyZIndex: PropTypes.number,
	};

	state = {
		stickyStyle: {},
		position: 'top',
		setStickyStyle: (stickyStyle) => {
			this.setState({ stickyStyle });
		},
		stickyZIndex: 1,
	};

	styles = createStyles();

	containerStatus = 'appear';

	handleTopEnter = () => {
		if (this.state.position !== 'up') {
			this.setState({ position: 'top' });
		}
	};

	handleTopLeave = () => {
		if (this.containerStatus === 'enter' && this.state.position !== 'fixed') {
			this.setState({ position: 'fixed' });
		}
	};

	handleBottomEnter = ({ direction }) => {
		if (direction === 'up' && this.state.position !== 'fixed') {
			this.setState({ position: 'fixed' });
		}
	};

	handleBottomLeave = ({ direction }) => {
		if (direction === 'down' && this.state.position !== 'down') {
			this.setState({ position: 'bottom' });
		}
	};

	handleContainerEnter = () => {
		this.containerStatus = 'enter';
	};

	handleContainerLeave = () => {
		this.containerStatus = 'leave';
	};

	renderChildren = ({ ref }) => {
		const {
			props: { children, sticky, stickyZIndex, style, ...other },
			state: { stickyStyle },
			styles,
		} = this;
		return (
			<div {...other} style={styles.container(style)} ref={ref}>
				<div style={stickyStyle} />
				<Hook
					onEnter={this.handleTopEnter}
					onLeave={this.handleTopLeave}
					style={styles.topHook}
				/>
				{children}
				{sticky && (
					<Sticky style={styles.sticky(stickyZIndex)}>{sticky}</Sticky>
				)}
				<Hook
					onEnter={this.handleBottomEnter}
					onLeave={this.handleBottomLeave}
					style={styles.bottomHook(stickyStyle.height)}
				/>
			</div>
		);
	};

	render() {
		return (
			<StickyContext.Provider value={this.state}>
				<ScrollObserver
					onEnter={this.handleContainerEnter}
					onLeave={this.handleContainerLeave}
				>
					{this.renderChildren}
				</ScrollObserver>
			</StickyContext.Provider>
		);
	}
}
