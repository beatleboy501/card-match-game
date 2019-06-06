import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { MainMenu } from '../../../components/App/MainMenu';
import Levels from '../../../constants/Levels';
import { easyCards, levels, resetProps } from '../../testUtils';
import 'isomorphic-fetch';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const mockCloseDrawer = jest.fn(() => {});
const mockOpenDrawer = jest.fn(() => {});
const mockResetGame = jest.fn(() => {});
const mockResetMemoryGame = jest.fn(() => {});
const mockSetLevels = jest.fn(() => {});
const mockSetCurrentCards = jest.fn(() => {});
const mockToggleSpotifyWidget = jest.fn(() => {});
const mockToggleCardMatchCount = jest.fn(() => {});

let spy;
let store;
let component;
let defaultProps;
global.alert = jest.fn(message => message);

beforeEach(() => {
  defaultProps = {
    currentCards: null,
    levels: [],
    isDrawerDisplayed: false,
    isSpotifyWidgetDisplayed: false,
    dispatchToggleSpotifyWidget: mockToggleSpotifyWidget,
    dispatchToggleCardMatchCount: mockToggleCardMatchCount,
    dispatchCloseDrawer: mockCloseDrawer,
    dispatchOpenDrawer: mockOpenDrawer,
    dispatchResetGame: mockResetGame,
    dispatchResetMemoryGame: mockResetMemoryGame,
    dispatchSetLevels: mockSetLevels,
    dispatchSetCurrentCards: mockSetCurrentCards,
  };
  store = mockStore(defaultProps);
});

afterEach(() => {
  defaultProps = resetProps(defaultProps);
});

it('Renders without crashing', () => {
  component = shallow(<MainMenu {...defaultProps} />).shallow();
  expect(component).toMatchSnapshot();
});

it('Fetches levels after mount', () => {
  spy = jest.spyOn(MainMenu.prototype, 'componentDidMount');
  component = mount(<MainMenu store={store} {...defaultProps} />);
  component.instance().componentDidMount();
  expect(spy).toHaveBeenCalled();
  spy.mockClear();
});

it('Sets cards when fetchCards is called with a valid level', () => {
  spy = jest.spyOn(MainMenu.prototype, 'fetchCards');
  component = mount(
    <MainMenu
      store={store}
      {...defaultProps}
      levels={levels}
    />,
  );
  component.instance().fetchCards(Levels.EASY);
  expect(spy).toHaveBeenCalledWith(Levels.EASY);
  expect(mockSetCurrentCards).toHaveBeenCalled();
  spy.mockClear();
});

it('Returns MemoryGame cards when currentCards has been set', () => {
  component = mount(
    <Provider store={store}>
      <MainMenu
        {...defaultProps}
        levels={levels}
        currentCards={easyCards}
      />
    </Provider>,
  );
  expect(component.html()).toContain('div class="Flipper"');
});

it('Returns LevelSelector when fetchCards is called with an invalid level', () => {
  component = mount(
    <MainMenu
      {...defaultProps}
      store={store}
      levels={levels}
    />,
  );
  component.find(MainMenu).instance().fetchCards('INVALID');
  expect(defaultProps.dispatchSetCurrentCards).not.toHaveBeenCalled();
  expect(component.render().find('div.Flipper').length).toBeLessThan(1);
  expect(component.render().find('div.level-selector').length).toBeGreaterThan(0);
});

it('Returns LevelSelector when no level selected', () => {
  component = mount(
    <MainMenu
      {...defaultProps}
      store={store}
      levels={levels}
    />,
  );
  expect(defaultProps.dispatchSetCurrentCards).not.toHaveBeenCalled();
  expect(component.render().find('div.Flipper').length).toBeLessThan(1);
  expect(component.render().find('div.level-selector').length).toBeGreaterThan(0);
});
