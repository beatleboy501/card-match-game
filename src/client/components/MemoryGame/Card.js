import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Flipper from './Flipper';
import sassStyles from '../../styles/Card.scss';
import logo from '../../../public/timesLogo.png';

const propTypes = {
  cardInfo: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {};

const styles = {
  card: {
    width: 100,
    height: 175,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardBack: {
    height: 50,
    width: 50,
  },
};

export const GameCard = (props) => {
  const { cardInfo, isOpen, onClick } = props;
  return (
    <div className={sassStyles.responsiveCell}>
      <Flipper isClosed={!isOpen}>
        <Card onClick={onClick} style={styles.card} key="front">
          <CardContent>
            <div>
              <Typography color="textSecondary">
                {' '}
              </Typography>
              <Typography
                variant="headline"
                component="h2"
              >
                {cardInfo.value}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card onClick={onClick} style={styles.card} key="back">
          <CardContent>
            <CardMedia style={styles.cardBack} image={logo} />
          </CardContent>
        </Card>
      </Flipper>
    </div>
  );
};

GameCard.propTypes = propTypes;
GameCard.defaultProps = defaultProps;

export default withStyles(styles)(GameCard);
