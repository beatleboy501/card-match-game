import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GameCard } from '../../../components/MemoryGame/Card';
import { easyCards } from '../../testUtils';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
  cardInfo: easyCards[0],
  isOpen: false,
  onClick: () => {},
};

let component;

it('Shows card value if isOpen', () => {
  component = shallow(<GameCard {...defaultProps} />).shallow();
  expect(component).toMatchSnapshot();
});


it('Shows back if not isOpen', () => {
  const props = {
    ...defaultProps,
    isOpen: true,
  };
  component = shallow(<GameCard {...props} />).shallow();
  expect(component).toMatchSnapshot();
});
