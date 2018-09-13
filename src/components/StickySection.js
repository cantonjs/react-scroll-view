import createStyles from './StickySection.styles';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stickyNodeType } from '../PropTypes';
import { StickyContext } from '../Contexts';
import Hook from './Hook';
import Sticky from './Sticky';

export default class StickySection extends Component {
	static propTypes = {
		children: PropTypes.node,
		sticky: stickyNodeType,
		style: PropTypes.object,
		stickyZIndex: PropTypes.number,
		debugId: PropTypes.string,
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

	setPosition(position) {
		if (this.state.position !== position) {
			this.setState({ position });
		}
	}

	handleTopEnter = (entryState) => {
		this.setPosition(entryState.isTopEdge ? 'fixed' : 'top');
	};

	handleTopLeave = (entryState) => {
		if (entryState.isOffsetTop) {
			this.setPosition('fixed');
		}
	};

	handleIntersect = (entryState) => {
		if (
			entryState.isTopEdge ||
			(entryState.isBottomVisible && !entryState.isTopVisible)
		) {
			this.setPosition('fixed');
		}
		else if (entryState.isTopVisible || entryState.isOffsetBottom) {
			this.setPosition('top');
		}
		else if (entryState.isOffsetTop) {
			this.setPosition('bottom');
		}
	};

	render() {
		const {
			props: { children, sticky, stickyZIndex, style, debugId, ...other },
			state: { stickyStyle },
			styles,
		} = this;
		return (
			<StickyContext.Provider value={this.state}>
				<div {...other} style={styles.container(style)}>
					<div style={stickyStyle} />
					<Hook
						debugId={`${debugId}(top)`}
						onEnter={this.handleTopEnter}
						onLeave={this.handleTopLeave}
						style={styles.topHook}
					/>
					{children}
					{sticky && (
						<Sticky style={styles.sticky(stickyZIndex)}>{sticky}</Sticky>
					)}
					<Hook
						debugId={`${debugId}(bottom)`}
						onIntersect={this.handleIntersect}
						style={styles.bottomHook(stickyStyle.height)}
					/>
				</div>
			</StickyContext.Provider>
		);
	}
}
