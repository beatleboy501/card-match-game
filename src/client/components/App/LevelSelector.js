import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles/LevelSelector.scss';

const propTypes = {
  fetchCards: PropTypes.func.isRequired,
  levels: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  levels: [],
};

const LevelSelector = (props) => {
  const { fetchCards, levels } = props;
  return (
    <div className="level-selector">
      {levels.length ? (
        <Typography className={styles.heading} variant="title" color="inherit">
          Choose a Level
        </Typography>
      ) : <div />}
      <div className={styles.buttonSet}>
        {levels.map(level => (
          <Button
            key={level.difficulty}
            className={styles.button}
            onClick={() => fetchCards(level.difficulty)}
            type="button"
          >
            {level.difficulty}
          </Button>
        ))}
      </div>
    </div>
  );
};

LevelSelector.propTypes = propTypes;
LevelSelector.defaultProps = defaultProps;

export default LevelSelector;
