const twoDigits = (timeValue) => {
  if (timeValue < 0) {
    return '00';
  }
  if (timeValue.toString().length <= 1) {
    return `0${timeValue}`;
  }
  return timeValue;
};

export default twoDigits;
