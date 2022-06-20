// Generate random number with max value
export const getRandomNumber = (max: number = 1): number => {
  return Math.floor(Math.random() * max);
};
