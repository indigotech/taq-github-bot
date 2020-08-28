export const MathUtils = {
  round(n: number, decimalPlaces = 0) {
    const multiplier = decimalPlaces === 0 ? 1 : 10 ** decimalPlaces;
    return Math.round(n * multiplier) / multiplier;
  },
};
