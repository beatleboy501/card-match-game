export function shuffleCards(cards, assignIds) {
  let j;
  let x;
  const shuffled = cards;
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = x;
  }
  return assignIds ? shuffled.map(card => ({ id: `${Math.floor(Math.random() * 1000000) + 1}`, value: card })) : shuffled;
}

export function addZero(n) {
  return (n < 10 ? `0${n}` : n);
}

export const gameEndpoint = 'https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json';

export const offlineLevels = [{ difficulty: 'easy', cards: ['a', 'a', 'b', 'b'] }];
