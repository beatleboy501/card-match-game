import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TopNav from '../../../components/App/TopNav';
import { easyCards } from '../../testUtils';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  currentCards: easyCards,
  logo: 'logo',
  parentRef: jest.fn(() => {}),
};

let component;

it('Renders without crashing', () => {
  component = shallow(<TopNav props={props} />).shallow();
  expect(component).toMatchSnapshot();
});
