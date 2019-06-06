export function startTimer(startTime, interval) {
  return {
    type: 'START_TIMER',
    startTime,
    interval,
  };
}

export function stopTimer(startTime) {
  return {
    type: 'STOP_TIMER',
    startTime,
  };
}

export function resetTimer() {
  return {
    type: 'RESET_TIMER',
  };
}

export function setDiff(diff) {
  return {
    type: 'SET_DIFF',
    diff,
  };
}

export function tick(diff, interval) {
  return {
    type: 'TICK',
    diff,
    interval,
  };
}
