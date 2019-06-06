// Use `npm run test` to run the test suite on demand;
// `npm run test-watch` will re-run it automatically with every code change.
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Timer } from '../../../components/MemoryGame/Timer';
import { resetProps } from '../../testUtils';

Enzyme.configure({ adapter: new Adapter() });
const testInterval = 1;
const mockStartTimer = jest.fn((startTime, interval) => [startTime, interval]);
const mockStopTimer = jest.fn(() => {});
const mockResetTimer = jest.fn(() => {});
const mockSetDiff = jest.fn(newDiff => newDiff);
const mockTick = jest.fn(() => {});

let defaultProps;

let component;
let spy;
let expectedProps;

const addEventListener = jest.fn();
const requestAnimationFrame = jest.fn(() => testInterval);
const cancelAnimationFrame = jest.fn();
const removeEventListener = jest.fn();

global.window = global;
window.addEventListener = addEventListener;
window.requestAnimationFrame = requestAnimationFrame;
window.cancelAnimationFrame = cancelAnimationFrame;
window.removeEventListener = removeEventListener;

beforeEach(() => {
  defaultProps = {
    diff: new Date(0),
    startTime: Date.now(),
    interval: testInterval,
    dispatchStartTimer: mockStartTimer,
    dispatchStopTimer: mockStopTimer,
    dispatchResetTimer: mockResetTimer,
    dispatchSetDiff: mockSetDiff,
    dispatchTick: mockTick,
  };
});

afterEach(() => {
  if (spy) spy.mockClear();
  defaultProps = resetProps(defaultProps);
});

it('Renders without crashing', () => {
  component = shallow(<Timer {...defaultProps} />).shallow();
  expect(component).toMatchSnapshot();
});

test('start sets the correct props', () => {
  expectedProps = {
    diff: new Date(0),
    dispatchResetTimer: mockResetTimer,
    dispatchSetDiff: mockSetDiff,
    dispatchStartTimer: mockStartTimer,
    dispatchStopTimer: mockStopTimer,
    dispatchTick: mockTick,
    interval: testInterval,
  };
  component = mount(<Timer {...defaultProps} />);
  component.instance().start();
  expect(
    component.instance().props,
  ).toEqual(expect.objectContaining(expectedProps));
});

test('start calls correct functions', () => {
  spy = jest.spyOn(Timer.prototype, 'start');
  component = mount(<Timer {...defaultProps} />);
  component.instance().start();
  expect(spy).toHaveBeenCalled();
  expect(requestAnimationFrame).toHaveBeenCalled();
});

test('stop sets the correct props', () => {
  expectedProps = {
    diff: new Date(0),
    dispatchResetTimer: mockResetTimer,
    dispatchSetDiff: mockSetDiff,
    dispatchStartTimer: mockStartTimer,
    dispatchStopTimer: mockStopTimer,
    dispatchTick: mockTick,
    interval: testInterval,
  };
  component = mount(<Timer {...defaultProps} />);
  component.instance().stop();
  expect(
    component.instance().props,
  ).toEqual(expect.objectContaining(expectedProps));
});

test('stop calls correct functions', () => {
  spy = jest.spyOn(Timer.prototype, 'stop');
  component = mount(<Timer {...defaultProps} />);
  component.instance().stop();
  expect(spy).toHaveBeenCalled();
  expect(cancelAnimationFrame).toHaveBeenCalled();
});

test('reset sets the correct props', () => {
  expectedProps = {
    diff: new Date(0),
    dispatchResetTimer: mockResetTimer,
    dispatchSetDiff: mockSetDiff,
    dispatchStartTimer: mockStartTimer,
    dispatchStopTimer: mockStopTimer,
    dispatchTick: mockTick,
    interval: testInterval,
  };
  component = mount(<Timer {...defaultProps} />);
  component.instance().reset();
  expect(
    component.instance().props,
  ).toEqual(expect.objectContaining(expectedProps));
});

test('reset calls correct functions', () => {
  spy = jest.spyOn(Timer.prototype, 'reset');
  component = mount(<Timer {...defaultProps} />);
  component.instance().reset();
  expect(spy).toHaveBeenCalled();
  expect(cancelAnimationFrame).toHaveBeenCalled();
});
