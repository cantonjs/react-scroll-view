import createStyles from './StickySection.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyContext } from '../Contexts';
import Hook from './Hook';
import Sticky from './Sticky';

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

	handleTopEnter = ({ direction }) => {
		if (direction === 'up' && this.state.position !== 'up') {
			this.setState({ position: 'top' });
		}
	};

	handleTopLeave = ({ direction }) => {
		if (direction === 'down' && this.state.position !== 'fixed') {
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

	render() {
		const {
			props: { children, sticky, stickyZIndex, style, ...other },
			state: { stickyStyle },
			styles,
		} = this;
		return (
			<StickyContext.Provider value={this.state}>
				<div {...other} style={styles.container(style)}>
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
			</StickyContext.Provider>
		);
	}
}
