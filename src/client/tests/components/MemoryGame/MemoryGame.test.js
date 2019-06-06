import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { MemoryGame } from '../../../components/MemoryGame/index';
import { easyCards, resetProps } from '../../testUtils';
import CardMatchCounts from '../../../constants/CardMatchCounts';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const initialState = {
  cards: [],
  openIds: [],
  pairedCards: [],
  isFirstCard: true,
};

let store;
let component;
let defaultProps;

const mockGameStart = jest.fn(id => id);
const mockStartGame = jest.fn(() => {});
const mockGameComplete = jest.fn(() => {});
const mockAddOpenId = jest.fn(id => id);
const mockAddMatch = jest.fn(arr => arr);
const mockSetOpenIds = jest.fn(id => id);

beforeEach(() => {
  store = mockStore(initialState);
  defaultProps = {
    cards: easyCards,
    isFirstCard: true,
    cardMatchCount: CardMatchCounts.TWO_CARD_MATCH,
    dispatchStartGame: mockStartGame,
    dispatchAddOpenId: mockAddOpenId,
    dispatchAddMatch: mockAddMatch,
    dispatchSetOpenIds: mockSetOpenIds,
    onGameStart: mockGameStart,
    onGameComplete: mockGameComplete,
    openIds: [],
    matchedCards: [],
  };
});

afterEach(() => {
  defaultProps = resetProps(defaultProps);
});

it('Renders without crashing', () => {
  component = shallow(
    <Provider store={store}>
      <MemoryGame {...defaultProps} />
    </Provider>,
  ).shallow();
  expect(component).toMatchSnapshot();
});

it('does not mark the game as complete when insufficient number of cards are matched', () => {
  const props = {
    ...defaultProps,
    cards: easyCards,
    matchedCards: [['1', '2'], ['3', '4']],
  };
  component = mount(
    <MemoryGame {...props} />,
  );
  expect(component.instance().isGameComplete()).toBe(false);
});

it('marks the game as complete when correct number of matchedCards is reached', () => {
  const props = {
    ...defaultProps,
    cards: easyCards,
    matchedCards: [['1', '2'], ['3', '4'], ['5', '6'], ['7', '8']],
  };
  component = mount(
    <MemoryGame {...props} />,
  );
  expect(component.instance().isGameComplete()).toBe(true);
});

it('isMatched returns true if card is matched', () => {
  const props = {
    ...defaultProps,
    matchedCards: [['1', '2']],
  };
  component = mount(
    <MemoryGame {...props} />,
  );
  expect(component.instance().isMatched('2')).toBe(true);
});

it('isMatched returns false if card is not matched', () => {
  const props = {
    ...defaultProps,
    matchedCards: [['1', '2']],
  };
  component = mount(
    <MemoryGame {...props} />,
  );
  expect(component.instance().isMatched('3')).toBe(false);
});

it('onGameStart is fired when first card is clicked', async () => {
  component = mount(
    <MemoryGame {...defaultProps} />,
  );
  await component.instance().handleCardClick(1);
  expect(mockStartGame).toHaveBeenCalled();
  expect(mockGameStart).toHaveBeenCalled();
  expect(mockAddOpenId).toHaveBeenCalled();
});

it('onGameStart is not fired after first card has been clicked', async () => {
  const props = {
    ...defaultProps,
    isFirstCard: false,
  };
  component = mount(
    <MemoryGame {...props} />,
  );
  await component.instance().handleCardClick(1);
  expect(mockStartGame).not.toHaveBeenCalled();
  expect(mockGameStart).not.toHaveBeenCalled();
  expect(mockAddOpenId).toHaveBeenCalled();
});

it('adds single card if two card match and no other cards open after one card has been clicked', async () => {
  const props = {
    ...defaultProps,
    isFirstCard: false,
  };
  component = mount(
    <MemoryGame {...props} />,
  );
  await component.instance().handleCardClick(1);
  expect(mockAddOpenId).toHaveBeenCalledWith(1);
});

it('does nothing with click if card is already open', async () => {
  const props = {
    ...defaultProps,
    isFirstCard: false,
    openIds: [1],
  };
  component = mount(
    <MemoryGame {...props} />,
  );
  await component.instance().handleCardClick(1);
  expect(mockAddOpenId).not.toHaveBeenCalled();
});

it('does nothing if openIds contains more ids than the match count', async () => {
  const props = {
    ...defaultProps,
    isFirstCard: false,
    openIds: [1, 2, 3],
  };
  component = mount(
    <MemoryGame {...props} />,
  );
  await component.instance().handleCardClick(4);
  expect(mockSetOpenIds).not.toHaveBeenCalled();
});

it('resets if no match', async () => {
  const props = {
    ...defaultProps,
    isFirstCard: false,
    openIds: [1, 2],
  };
  component = mount(
    <MemoryGame {...props} />,
  );
  await component.instance().handleCardClickResult(2);
  expect(mockSetOpenIds).toHaveBeenCalledWith([]);
});

it('adds match if the open card matches the clicked card', async () => {
  const props = {
    ...defaultProps,
    cards: easyCards,
    isFirstCard: false,
    openIds: [1, 5],
  };
  component = mount(
    <MemoryGame {...props} />,
  );
  await component.instance().handleCardClickResult(5);
  expect(mockAddMatch).toHaveBeenCalledWith([5, 1]);
  expect(mockSetOpenIds).toHaveBeenCalledWith([]);
});
