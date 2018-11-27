export const MathUtils = {
  round(n: number, decimalPlaces: number = 0) {
    const multiplier = decimalPlaces === 0 ? 1 : decimalPlaces * 10;
    return Math.round(n * multiplier) / multiplier;
  },
};
