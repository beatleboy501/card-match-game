import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  resetTimer, setDiff, startTimer, stopTimer, tick,
} from '../../redux/actions/timerActions';
import { addZero } from '../../utils';

const propTypes = {
  diff: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  interval: PropTypes.number,
  startTime: PropTypes.number,
  dispatchStartTimer: PropTypes.func.isRequired,
  dispatchStopTimer: PropTypes.func.isRequired,
  dispatchResetTimer: PropTypes.func.isRequired,
  dispatchSetDiff: PropTypes.func.isRequired,
  dispatchTick: PropTypes.func.isRequired,
};

const defaultProps = {
  startTime: null,
  diff: null,
  interval: null,
};

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.getTime = this.getTime.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.tick = this.tick.bind(this);
    this.getDiff = this.getDiff.bind(this);
    this.setDiff = this.setDiff.bind(this);
  }

  getDiff() {
    const { diff } = this.props;
    return diff;
  }

  setDiff(diff) {
    const { dispatchSetDiff } = this.props;
    dispatchSetDiff(diff);
  }

  getTime() {
    const { diff } = this.props;
    let hundredths = diff ? Math.round(diff.getMilliseconds() / 10) : 0;
    const seconds = diff ? diff.getSeconds() : 0;
    const minutes = diff ? diff.getMinutes() : 0;
    if (hundredths === 100) hundredths = 0;
    return { hundredths, seconds, minutes };
  }

  start() {
    const { dispatchStartTimer, startTime, interval } = this.props;
    if (interval) cancelAnimationFrame(interval);
    const newStartTime = startTime || +new Date();
    dispatchStartTimer(newStartTime, requestAnimationFrame(this.tick));
  }

  stop() {
    const { dispatchStopTimer, interval } = this.props;
    cancelAnimationFrame(interval);
    dispatchStopTimer();
  }

  reset() {
    const { dispatchResetTimer, interval } = this.props;
    cancelAnimationFrame(interval);
    dispatchResetTimer();
  }

  tick() {
    const { dispatchTick, startTime } = this.props;
    dispatchTick(new Date(+new Date() - startTime), requestAnimationFrame(this.tick));
  }

  handleGameComplete(matchesCount) {
    this.stop();
    const time = this.getTime();
    alert(`${matchesCount} matches in ${addZero(time.minutes)}:${addZero(time.seconds)}:${addZero(time.hundredths)}`);
  }

  render() {
    const { hundredths, seconds, minutes } = this.getTime();
    return (
      <section>
        <h1>
          {addZero(minutes)}
:
          {addZero(seconds)}
:
          {addZero(hundredths)}
        </h1>
      </section>
    );
  }
}

Timer.propTypes = propTypes;
Timer.defaultProps = defaultProps;

function mapStateToProps(state) {
  return { ...state.timer };
}

const mapDispatchToProps = dispatch => ({
  dispatchStartTimer: (startTime, interval) => {
    dispatch(startTimer(startTime, interval));
  },
  dispatchStopTimer: (startTime) => {
    dispatch(stopTimer(startTime));
  },
  dispatchResetTimer: () => {
    dispatch(resetTimer());
  },
  dispatchSetDiff: (diff) => {
    dispatch(setDiff(diff));
  },
  dispatchTick: (diff, interval) => {
    dispatch(tick(diff, interval));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Timer);
