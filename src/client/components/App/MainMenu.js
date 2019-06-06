import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  closeDrawer, openDrawer, resetGame, setCurrentCards,
  setLevels, toggleSpotifyWidget, toggleCardMatchCount,
  persistRehydrate,
} from '../../redux/actions/mainMenuActions';
import { resetMemoryGame } from '../../redux/actions/memoryGameActions';
import logo from '../../../public/timesLogo.png';
import { gameEndpoint, offlineLevels } from '../../utils';
import TopNav from './TopNav';
import Content from './Content';
import styles from '../../styles/MainMenu.scss';
import DrawerMenu from './DrawerMenu';
import SpotifyWidget from './SpotifyWidget';
import CardMatchCounts from '../../constants/CardMatchCounts';

const propTypes = {
  currentCards: PropTypes.arrayOf(PropTypes.object),
  isDrawerDisplayed: PropTypes.bool.isRequired,
  isSpotifyWidgetDisplayed: PropTypes.bool.isRequired,
  cardMatchCount: PropTypes.number,
  levels: PropTypes.arrayOf(PropTypes.object),
  dispatchCloseDrawer: PropTypes.func.isRequired,
  dispatchOpenDrawer: PropTypes.func.isRequired,
  dispatchResetGame: PropTypes.func.isRequired,
  dispatchResetMemoryGame: PropTypes.func.isRequired,
  dispatchSetLevels: PropTypes.func.isRequired,
  dispatchSetCurrentCards: PropTypes.func.isRequired,
  dispatchToggleSpotifyWidget: PropTypes.func.isRequired,
  dispatchToggleCardMatchCount: PropTypes.func.isRequired,
};

const defaultProps = {
  currentCards: null,
  levels: [],
  cardMatchCount: CardMatchCounts.TWO_CARD_MATCH,
};

export class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCards = this.fetchCards.bind(this);
    this.reset = this.reset.bind(this);
    this.displayLevelSelector = this.displayLevelSelector.bind(this);
    this.handleGameStart = this.handleGameStart.bind(this);
    this.handleGameComplete = this.handleGameComplete.bind(this);
    this.state = {};
  }

  componentDidMount() { // could also move this to middleware
    const { levels, dispatchSetLevels } = this.props;
    if (levels.length > 0) return;
    fetch(gameEndpoint)
      .then(response => response.json())
      .then((result) => {
        const resultLevels = result.levels;
        dispatchSetLevels(resultLevels);
      })
      .catch((error) => {
        console.error(error);
        dispatchSetLevels(offlineLevels);
      });
  }

  displayLevelSelector() {
    this.reset();
    const { dispatchSetCurrentCards } = this.props;
    dispatchSetCurrentCards(null);
  }

  fetchCards(level) {
    const { dispatchSetCurrentCards, levels, cardMatchCount } = this.props;
    const levelCards = levels.length ? levels.find(l => l.difficulty === level) : null;
    if (!levelCards) {
      alert(`Invalid level: ${level}`);
    } else {
      const cards = cardMatchCount === CardMatchCounts.TWO_CARD_MATCH
        ? levelCards.twoCardMatch
        : levelCards.threeCardMatch;
      dispatchSetCurrentCards(cards);
    }
  }

  handleGameStart() {
    this.timer.start();
  }

  handleGameComplete(matchesCount) {
    this.timer.stop();
    const time = this.timer.getTime();
    alert(`${matchesCount} matches in ${time.minutes}:${time.seconds}:${time.hundredths}`);
  }

  reset() {
    const { dispatchResetGame, dispatchResetMemoryGame } = this.props;
    this.timer.reset();
    this.setState({});
    dispatchResetMemoryGame();
    dispatchResetGame();
  }

  render() {
    const {
      cardMatchCount,
      currentCards,
      dispatchCloseDrawer,
      dispatchOpenDrawer,
      dispatchToggleCardMatchCount,
      dispatchToggleSpotifyWidget,
      isDrawerDisplayed,
      isSpotifyWidgetDisplayed,
      levels,
    } = this.props;
    return (
      <div className={styles.container}>
        <TopNav
          currentCards={currentCards}
          logo={logo}
          timerRef={(el) => { this.timer = el && el.getWrappedInstance(); }}
          onBurgerClick={dispatchOpenDrawer}
        />
        <DrawerMenu
          onCloseDrawer={dispatchCloseDrawer}
          isGame={!!currentCards}
          isDrawerDisplayed={isDrawerDisplayed}
          toggleSpotifyWidget={dispatchToggleSpotifyWidget}
          toggleCardMatchCount={dispatchToggleCardMatchCount}
          onResetGame={this.reset}
          onExitGame={this.displayLevelSelector}
        />
        <Content
          currentCards={currentCards}
          levels={levels}
          fetchCards={this.fetchCards}
          parentRef={(el) => { this.memoryGame = el; }}
          onGameStart={this.handleGameStart}
          onGameComplete={this.handleGameComplete}
          cardMatchCount={cardMatchCount}
        />
        {isSpotifyWidgetDisplayed && (
          <SpotifyWidget />
        )}
      </div>
    );
  }
}

MainMenu.propTypes = propTypes;
MainMenu.defaultProps = defaultProps;

function mapStateToProps(state) {
  return { ...state.mainMenu };
}

const mapDispatchToProps = dispatch => ({
  dispatchResetGame: () => {
    dispatch(resetGame());
  },
  dispatchResetMemoryGame: () => {
    dispatch(resetMemoryGame());
  },
  dispatchSetCurrentCards: (currentCards) => {
    dispatch(setCurrentCards(currentCards));
  },
  dispatchSetLevels: (levels) => {
    dispatch(setLevels(levels));
  },
  dispatchOpenDrawer: () => {
    dispatch(openDrawer());
  },
  dispatchCloseDrawer: () => {
    dispatch(closeDrawer());
  },
  dispatchToggleSpotifyWidget: () => {
    dispatch(toggleSpotifyWidget());
  },
  dispatchToggleCardMatchCount: (cardMatchCount) => {
    dispatch(toggleCardMatchCount(cardMatchCount));
  },
  dispatchPersistRehydrate: (payload) => {
    dispatch(persistRehydrate(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
