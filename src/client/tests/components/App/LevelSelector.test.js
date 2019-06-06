import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LevelSelector from '../../../components/App/LevelSelector';
import Levels from '../../../constants/Levels';

Enzyme.configure({ adapter: new Adapter() });

const levels = [
  { difficulty: Levels.EASY, cards: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] },
  { difficulty: Levels.HARD, cards: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'] },
];

const fetchCards = (level) => {
  const { cards } = levels.length ? levels.find(l => l.difficulty === level) : { cards: [] };
  return cards;
};

let component;

it('Renders without crashing', () => {
  component = shallow(<LevelSelector fetchCards={fetchCards} levels={levels} />).shallow();
  expect(component).toMatchSnapshot();
});
