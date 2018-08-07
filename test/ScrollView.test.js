import 'intersection-observer';
import React, { createRef } from 'react';
import { ScrollView } from '../src';
import { mount, unmount, simulate } from './utils';
import delay from 'delay';

afterEach(unmount);

describe('ScrollView component', () => {
	test('should children work', () => {
		const text = 'hello world';
		const wrapper = mount(<ScrollView>{text}</ScrollView>);
		expect(wrapper.getDOMNode().textContent).toBe(text);
	});

	test('should onScroll work', () => {
		const text = 'hello world';
		const ref = createRef();
		const handleScroll = jest.fn();
		mount(
			<ScrollView innerRef={ref} onScroll={handleScroll}>
				{text}
			</ScrollView>,
		);
		simulate(ref).scroll(10);
		expect(handleScroll).toHaveBeenCalledTimes(1);
	});

	test('should onScrollStart work', () => {
		const text = 'hello world';
		const ref = createRef();
		const handleScrollStart = jest.fn();
		mount(
			<ScrollView innerRef={ref} onScrollStart={handleScrollStart}>
				{text}
			</ScrollView>,
		);
		simulate(ref).scroll(10);
		expect(handleScrollStart).toHaveBeenCalledTimes(1);
	});

	test('should onScrollEnd work', async () => {
		const text = 'hello world';
		const ref = createRef();
		const handleScrollEnd = jest.fn();
		mount(
			<ScrollView innerRef={ref} onScrollEnd={handleScrollEnd}>
				{text}
			</ScrollView>,
		);
		simulate(ref).scroll(10);
		await delay(200);
		expect(handleScrollEnd).toHaveBeenCalledTimes(1);
	});
});
