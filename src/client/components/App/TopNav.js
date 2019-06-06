import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Timer from '../MemoryGame/Timer';
import styles from '../../styles/TopNav.scss';

const propTypes = {
  currentCards: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.string,
  onBurgerClick: PropTypes.func,
  timerRef: PropTypes.func,
};

const defaultProps = {
  currentCards: null,
  logo: '',
  onBurgerClick: () => {},
  timerRef: () => {},
};

const TopNav = (props) => {
  const {
    currentCards, logo, onBurgerClick, timerRef,
  } = props;
  return (
    <AppBar
      position="static"
      color="default"
      className={styles.appBar}
      elevation={10}
    >
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={onBurgerClick}
        className={styles.burger}
      >
        <MenuIcon />
      </IconButton>
      <Toolbar className={styles.toolbar}>
        <div className={styles.header}>
          <img src={logo} alt="logo" className={styles.logo} />
          <Typography variant="title" color="inherit">
            Card Match Game
          </Typography>
        </div>
      </Toolbar>
      {currentCards && <Timer ref={el => timerRef(el)} />}
    </AppBar>
  );
};

TopNav.propTypes = propTypes;
TopNav.defaultProps = defaultProps;

export default TopNav;
