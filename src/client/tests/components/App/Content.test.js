import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Content from '../../../components/App/Content';
import { easyCards, levels } from '../../testUtils';
import CardMatchCounts from '../../../constants/CardMatchCounts';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
  currentCards: easyCards,
  cardMatchCount: CardMatchCounts.TWO_CARD_MATCH,
  fetchCards: jest.fn(() => {}),
  onGameStart: jest.fn(() => {}),
  onGameComplete: jest.fn(() => {}),
  parentRef: jest.fn(() => {}),
  levels,
};
const mockStore = configureStore();
let component;

it('Renders without crashing', () => {
  component = shallow(<Content {...defaultProps} />).shallow();
  expect(component).toMatchSnapshot();
});

it('Displays level selector when no current cards', () => {
  const props = defaultProps;
  props.currentCards = null;
  component = mount(
    <Provider store={mockStore(props)}>
      <Content {...props} />
    </Provider>,
  );
  expect(component.html()).not.toContain('div class="Flipper"');
  expect(component.html()).toContain('div class="level-selector"');
});

it('Displays game when current cards are set', () => {
  const props = defaultProps;
  props.currentCards = easyCards;
  component = mount(
    <Provider store={mockStore(props)}>
      <Content {...props} />
    </Provider>,
  );
  expect(component.html()).toContain('div class="Flipper"');
  expect(component.html()).not.toContain('div class="level-selector"');
});
