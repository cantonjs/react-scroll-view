import createStyles from './StickySection.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyContext } from '../Contexts';
import Hook from './Hook';
import Sticky from './Sticky';

const isEnteredFromBottom = (entry) => {
	return (
		entry.isIntersecting &&
		entry.intersectionRect.top === entry.boundingClientRect.top
	);
};

const isEnteredFromTop = (entry) => {
	return (
		entry.isIntersecting &&
		entry.intersectionRect.bottom === entry.boundingClientRect.bottom
	);
};

const isLeftFromTop = (entry) => {
	return !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
};

const isLeftFromBottom = (entry) => {
	return !entry.isIntersecting && entry.boundingClientRect.bottom > 0;
};

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

	handleTopEnter = () => {
		if (this.state.position !== 'up') {
			this.setState({ position: 'top' });
		}
	};

	handleTopLeave = () => {
		if (this.state.position !== 'fixed') {
			this.setState({ position: 'fixed' });
		}
	};

	handleBottomEnter = ({ entry }) => {
		if (
			entry.intersectionRect.top === entry.boundingClientRect.top &&
			this.state.position !== 'top'
		) {
			this.setState({ position: 'top' });
		}
		else if (
			entry.intersectionRect.bottom === entry.boundingClientRect.bottom &&
			this.state.position !== 'fixed'
		) {
			this.setState({ position: 'fixed' });
		}
	};

	handleBottomLeave = ({ entry }) => {
		console.log('leave', entry);

		if (
			entry.boundingClientRect.bottom <= 0 &&
			this.state.position !== 'down'
		) {
			this.setState({ position: 'bottom' });
		}
	};

	handleIntersect = ({ entry }) => {
		if (isEnteredFromTop(entry)) {
			console.log('entered from top');
		}
		else if (isEnteredFromBottom(entry)) {
			console.log('entered from bottom');
		}
		else if (isLeftFromTop(entry)) {
			console.log('left from top');
		}
		else if (isLeftFromBottom(entry)) {
			console.log('left from bottom');
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
					{/* <Hook
						onEnter={this.handleTopEnter}
						onLeave={this.handleTopLeave}
						style={styles.topHook}
					/> */}
					{children}
					{sticky && (
						<Sticky style={styles.sticky(stickyZIndex)}>{sticky}</Sticky>
					)}
					<Hook
						onIntersect={this.handleIntersect}
						style={styles.bottomHook(stickyStyle.height)}
					/>
				</div>
			</StickyContext.Provider>
		);
	}
}
