import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stickyfill from 'stickyfilljs';

export default class Sticky extends Component {
	static propTypes = {
		style: PropTypes.object,
	};

	componentDidMount() {
		Stickyfill.addOne(this.dom);
	}

	saveRef = (dom) => {
		this.dom = dom;
	};

	render() {
		const { style, ...other } = this.props;
		return (
			<div
				{...other}
				style={{ position: 'sticky', top: 0, ...style }}
				ref={this.saveRef}
			/>
		);
	}
}
