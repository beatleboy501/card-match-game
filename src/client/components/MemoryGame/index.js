import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Card from './Card';
import styles from '../../styles/MemoryGame.scss';
import {
  addMatch, addOpenId, setOpenIds, setMatchedCards, startGame,
} from '../../redux/actions/memoryGameActions';
import CardMatchCounts from '../../constants/CardMatchCounts';

const propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  isFirstCard: PropTypes.bool,
  dispatchStartGame: PropTypes.func.isRequired,
  dispatchAddOpenId: PropTypes.func.isRequired,
  dispatchAddMatch: PropTypes.func.isRequired,
  dispatchSetOpenIds: PropTypes.func.isRequired,
  onGameStart: PropTypes.func.isRequired,
  onGameComplete: PropTypes.func.isRequired,
  openIds: PropTypes.arrayOf(PropTypes.string),
  matchedCards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  cardMatchCount: PropTypes.number.isRequired,
};

const defaultProps = {
  cards: [],
  openIds: [],
  matchedCards: [],
  isFirstCard: true,
};

export class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleCardClick = AwesomeDebouncePromise(this.handleCardClick.bind(this), 500);
    this.handleCardClickResult = this.handleCardClickResult.bind(this);
    this.isMatched = this.isMatched.bind(this);
    this.isGameComplete = this.isGameComplete.bind(this);
    this.completeMatch = this.completeMatch.bind(this);
  }

  isGameComplete() {
    const { cards, matchedCards, cardMatchCount } = this.props;
    return (matchedCards.length && cards.length)
      && matchedCards.length >= cards.length / cardMatchCount;
  }

  isMatched(cardId) {
    const { matchedCards } = this.props;
    const matches = matchedCards.reduce((acc, match) => acc.concat(match), []);
    return matches.includes(cardId);
  }

  handleCardClick(clickedId) {
    const {
      openIds, isFirstCard, onGameStart, dispatchStartGame, cardMatchCount, dispatchAddOpenId,
    } = this.props;
    if (isFirstCard) {
      onGameStart();
      dispatchStartGame();
    }
    if (this.isMatched(clickedId)
      || openIds.includes(clickedId)
      || openIds.length >= cardMatchCount) return;
    if (openIds.length > 0) { // One card has already been flipped
      dispatchAddOpenId(clickedId);
      setTimeout(() => {
        this.handleCardClickResult(clickedId);
      }, 1000);
    } else { // No cards have been flipped
      dispatchAddOpenId(clickedId);
    }
  }

  handleCardClickResult(clickedId) {
    const {
      cards, dispatchSetOpenIds, openIds, matchedCards, cardMatchCount,
    } = this.props;
    if (cardMatchCount === CardMatchCounts.TWO_CARD_MATCH) {
      const clickedCard = cards.find(card => card.id === clickedId);
      const openId = openIds.find(id => id !== clickedId);
      const openCard = cards.find(card => card.id === openId);
      if ((openCard && clickedCard) && openCard.value === clickedCard.value) { // there's a match
        this.completeMatch([clickedId, openId], matchedCards);
      } else { // no match
        dispatchSetOpenIds([]);
      }
    } else if (cardMatchCount === CardMatchCounts.THREE_CARD_MATCH) {
      const openCards = cards.filter(card => openIds.includes(card.id));
      const openValues = openCards.map(card => card.value);
      const distinctValues = openValues.reduce((acc, value) => {
        if (!acc.includes(value)) acc.push(value);
        return acc;
      }, []);
      if (distinctValues.length === 1) { // there's a match
        if (openValues.length === cardMatchCount) {
          this.completeMatch(openIds, matchedCards);
        }
      } else { // no match
        dispatchSetOpenIds([]);
      }
    }
  }

  completeMatch(matchArray, matchedCards) {
    const { dispatchAddMatch, dispatchSetOpenIds, onGameComplete } = this.props;
    dispatchAddMatch(matchArray);
    dispatchSetOpenIds([]);
    if (this.isGameComplete()) {
      onGameComplete(matchedCards.length);
    }
  }

  render() {
    const { cards, matchedCards, openIds } = this.props;
    return (
      <div className={styles.container}>
        <Typography className={styles.matches} variant="title" color="inherit">
          Matches
          {' '}
          {' '}
:
          {' '}
          {matchedCards.length}
        </Typography>
        <div className={styles.cardsContainer}>
          <div className={styles.cards}>
            {cards.map(card => (
              <Card
                key={card.id}
                cardInfo={card}
                isOpen={// is part of a match or it has been clicked
                  this.isMatched(card.id) || openIds.includes(card.id)
                }
                onClick={() => this.handleCardClick(card.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

MemoryGame.propTypes = propTypes;
MemoryGame.defaultProps = defaultProps;

function mapStateToProps(state) {
  return { ...state, ...state.memoryGame };
}

const mapDispatchToProps = dispatch => ({
  dispatchAddMatch: (match) => {
    dispatch(addMatch(match));
  },
  dispatchAddOpenId: (openId) => {
    dispatch(addOpenId(openId));
  },
  dispatchSetOpenIds: (openIds) => {
    dispatch(setOpenIds(openIds));
  },
  dispatchSetMatchedCards: (matchedCards) => {
    dispatch(setMatchedCards(matchedCards));
  },
  dispatchStartGame: () => {
    dispatch(startGame());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryGame);
