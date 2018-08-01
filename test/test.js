import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('task', function () {
	const text = 'hello world';
	const wrapper = mount(<div>{text}</div>);
	expect(wrapper.find('div').text()).toBe(text);
});
