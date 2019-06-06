import Levels from '../constants/Levels';

export const easyCards = [
  { id: 1, value: 'a' },
  { id: 2, value: 'b' },
  { id: 3, value: 'c' },
  { id: 4, value: 'd' },
  { id: 5, value: 'a' },
  { id: 6, value: 'b' },
  { id: 7, value: 'c' },
  { id: 8, value: 'd' }];

const hardCards = [
  { id: 1, value: 'a' },
  { id: 2, value: 'b' },
  { id: 3, value: 'c' },
  { id: 4, value: 'd' },
  { id: 5, value: 'e' },
  { id: 6, value: 'f' },
  { id: 7, value: 'g' },
  { id: 8, value: 'h' },
  { id: 9, value: 'a' },
  { id: 10, value: 'b' },
  { id: 11, value: 'c' },
  { id: 12, value: 'd' },
  { id: 13, value: 'e' },
  { id: 14, value: 'f' },
  { id: 15, value: 'g' },
  { id: 16, value: 'h' }];

export const levels = [
  { difficulty: Levels.EASY, cards: easyCards },
  { difficulty: Levels.HARD, cards: hardCards },
];

export const resetProps = (props) => {
  Object.keys(props).forEach((key) => {
    const mock = props[key];
    if (mock && mock.mockReset) mock.mockReset();
  });
  return null;
};
