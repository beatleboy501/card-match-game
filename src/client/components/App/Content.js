import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import MemoryGame from '../MemoryGame/index';
import LevelSelector from './LevelSelector';
import styles from '../../styles/MiddleContent.scss';

const propTypes = {
  currentCards: PropTypes.arrayOf(PropTypes.object),
  levels: PropTypes.arrayOf(PropTypes.object),
  fetchCards: PropTypes.func.isRequired,
  onGameStart: PropTypes.func.isRequired,
  onGameComplete: PropTypes.func.isRequired,
  parentRef: PropTypes.func.isRequired,
  cardMatchCount: PropTypes.number.isRequired,
};

const defaultProps = {
  currentCards: null,
  levels: [],
};

const Content = (props) => {
  const {
    currentCards, levels, fetchCards, onGameStart,
    onGameComplete, parentRef, cardMatchCount,
  } = props;
  return (
    <div className={styles.mainPanel}>
      <Paper className={styles.paper} elevation={10}>
        {currentCards ? (
          <MemoryGame
            ref={el => parentRef(el)}
            cardMatchCount={cardMatchCount}
            cards={currentCards}
            onGameStart={onGameStart}
            onGameComplete={onGameComplete}
          />
        ) : (
          <LevelSelector levels={levels} fetchCards={fetchCards} />
        )}
      </Paper>
    </div>
  );
};


Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
