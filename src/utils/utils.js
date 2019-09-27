// UTILS HELPERS/FUNCTIONS

const shuffle = unshuffled => unshuffled
  .map(a => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map(a => a.value);

const padTime = time => (time < 10 ? '0' : '') + time;

export { shuffle, padTime };
