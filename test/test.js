import 'intersection-observer';
import React, { createRef } from 'react';
import { ScrollView } from '../src';
import { mount, unmount, simulate } from './utils';
import delay from 'delay';

afterEach(unmount);

describe('ScrollView component', () => {
	test('should `children` work', () => {
		const text = 'hello world';
		const wrapper = mount(<ScrollView>{text}</ScrollView>);
		expect(wrapper.getDOMNode().textContent).toBe(text);
	});

	test('should `overflowY` be `auto`', () => {
		const wrapper = mount(<ScrollView />);
		expect(wrapper.getDOMNode().firstElementChild.style.overflowY).toBe('auto');
	});

	test('should `disabled` work', () => {
		const wrapper = mount(<ScrollView disabled />);
		expect(wrapper.getDOMNode().firstElementChild.style.overflowY).toBe(
			'hidden',
		);
	});

	test('should `isHorizontal` work', () => {
		const wrapper = mount(<ScrollView isHorizontal />);
		expect(wrapper.getDOMNode().firstElementChild.style.overflowX).toBe('auto');
	});

	test('should `onScroll` work', () => {
		const ref = createRef();
		const handleScroll = jest.fn();
		mount(<ScrollView innerRef={ref} onScroll={handleScroll} />);
		simulate(ref).scroll(10);
		expect(handleScroll).toHaveBeenCalledTimes(1);
	});

	test('should `onScrollStart` work', () => {
		const ref = createRef();
		const handleScrollStart = jest.fn();
		mount(<ScrollView innerRef={ref} onScroll={handleScrollStart} />);
		simulate(ref).scroll(10);
		expect(handleScrollStart).toHaveBeenCalledTimes(1);
	});

	test('should `onScrollEnd` work', async () => {
		const ref = createRef();
		const handleScrollEnd = jest.fn();
		mount(<ScrollView innerRef={ref} onScroll={handleScrollEnd} />);
		simulate(ref).scroll(10);
		await delay(200);
		expect(handleScrollEnd).toHaveBeenCalledTimes(1);
	});
});
