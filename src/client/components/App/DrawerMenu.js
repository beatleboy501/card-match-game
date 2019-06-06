import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import LooksThreeIcon from '@material-ui/icons/Looks3';
import CloseIcon from '@material-ui/icons/Close';
import RefreshIcon from '@material-ui/icons/Refresh';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import CardMatchCounts from '../../constants/CardMatchCounts';

const listItemsPropTypes = {
  onCloseDrawer: PropTypes.func.isRequired,
  isGame: PropTypes.bool.isRequired,
  toggleSpotifyWidget: PropTypes.func.isRequired,
  toggleCardMatchCount: PropTypes.func.isRequired,
  onResetGame: PropTypes.func.isRequired,
  onExitGame: PropTypes.func.isRequired,
};

const generateListItem = (onClick, primary, icon) => (
  <ListItem
    button
    onClick={onClick}
  >
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText primary={primary} />
  </ListItem>
);

const listItems = (props) => {
  const {
    onCloseDrawer, isGame, toggleSpotifyWidget, toggleCardMatchCount, onResetGame, onExitGame,
  } = props;
  return (
    <div>
      {generateListItem(() => {
        toggleSpotifyWidget();
        onCloseDrawer();
      }, 'Spotify Widget', <PlayArrowIcon />)}
      {!isGame && generateListItem(() => {
        toggleCardMatchCount(CardMatchCounts.TWO_CARD_MATCH);
        onCloseDrawer();
      }, '2 Card Match', <LooksTwoIcon />)}
      {!isGame && generateListItem(() => {
        toggleCardMatchCount(CardMatchCounts.THREE_CARD_MATCH);
        onCloseDrawer();
      }, '3 Card Match', <LooksThreeIcon />)}
      {isGame && generateListItem(() => {
        onCloseDrawer();
        onResetGame();
      }, 'Reset Game', <RefreshIcon />)}
      {isGame && generateListItem(() => {
        onCloseDrawer();
        onExitGame();
      }, 'Main Menu', <KeyboardReturnIcon />)}
    </div>
  );
};

listItems.propTypes = listItemsPropTypes;

const propTypes = {
  onCloseDrawer: PropTypes.func.isRequired,
  isDrawerDisplayed: PropTypes.bool.isRequired,
};

const DrawerMenu = (props) => {
  const {
    onCloseDrawer, isDrawerDisplayed,
  } = props;
  return (
    <Drawer anchor="left" open={isDrawerDisplayed}>
      <div>
        <IconButton onClick={onCloseDrawer}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{listItems(props)}</List>
      <Divider />
    </Drawer>
  );
};

DrawerMenu.propTypes = propTypes;

export default DrawerMenu;
