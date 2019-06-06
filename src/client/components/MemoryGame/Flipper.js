import React from 'react';
import PropTypes from 'prop-types';

class Flipper extends React.Component {
  constructor(props) {
    super(props);
    const { isClosed } = this.props;
    this.state = {
      isClosed,
      rotation: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isClosed } = this.props;
    const { rotation } = this.state;
    if (nextProps.isClosed !== isClosed) {
      this.setState({ isClosed: nextProps.isClosed });
      this.setState({ rotation: rotation + 180 });
    }
  }

  getComponent(key) {
    const { children } = this.props;
    return children.filter(component => component.key === key);
  }

  render() {
    const { isClosed } = this.state;
    const styles = {
      container: {
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        margin: '50px',
      },
      flipper: {
        position: 'relative',
        transform: 'rotateY(0deg)',
        transformStyle: 'preserve-3d',
        transition: '0.6s',
      },
      flipperFlip: {
        position: 'relative',
        transform: 'rotateY(180deg)',
        transformStyle: 'preserve-3d',
        transition: '0.6s',
      },
      front: {
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        left: '0',
        position: 'absolute',
        top: '0',
        transform: 'rotateY(0deg)',
        transformStyle: 'preserve-3d',
        width: '100%',
        zIndex: '2',
      },
      back: {
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        left: '0',
        position: 'absolute',
        transform: 'rotateY(180deg)',
        transformStyle: 'preserve-3d',
        top: '0',
        width: '100%',
      },
    };

    return (
      <div className="Flipper" style={styles.container}>
        <div style={isClosed ? styles.flipperFlip : styles.flipper}>
          <div style={styles.front}>
            {this.getComponent('front')}
          </div>
          <div style={styles.back}>
            {this.getComponent('back')}
          </div>
        </div>
      </div>
    );
  }
}

Flipper.propTypes = {
  cardStyles: PropTypes.shape({
    front: PropTypes.object,
    back: PropTypes.object,
  }),
  children: (props, propName, componentName) => {
    if (React.Children.count(props[propName]) !== 2) {
      return new Error(`${componentName} requires two children.`);
    }
    return null;
  },
  isClosed: PropTypes.bool,
};

Flipper.defaultProps = {
  cardStyles: {
    front: {},
    back: {},
  },
  children: [],
  isClosed: true,
};

export default Flipper;
