import React from 'react';
import DashboardSidebar from '../dashboard-sidebar';

let componentWrapper;
let defaultProps = {
  expandSidebar: false
};
beforeEach(() => {
  componentWrapper = mount(<DashboardSidebar {...defaultProps} />);
});

test('it should render expected elements when expandSidebar is false or true', () => {
  expect(componentWrapper).toMatchSnapshot();

  expect(componentWrapper.find('div[className*="md-thin"]').length).toEqual(1);
  expect(componentWrapper.find('i[className*="th large"]').length).toEqual(1);
  expect(componentWrapper.find('i[className*="mail"]').length).toEqual(1);

  componentWrapper.setProps({ expandSidebar: true });
  expect(componentWrapper.find('div[className*="md-wide"]').length).toEqual(1);
  expect(
    componentWrapper.find('div[className="content active"]').length
  ).toEqual(1);
});
