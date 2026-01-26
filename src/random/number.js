export default ({
  min = 1,
  max = 1_000_000,
  decimalPlaces = 0
} = {}) => {
  const dp = Math.max(0, Math.floor(decimalPlaces));
  const factor = 10 ** dp;

  const lo = Math.min(min, max);
  const hi = Math.max(min, max);

  const loInt = Math.ceil(lo * factor);
  const hiInt = Math.floor(hi * factor);

  const rInt = Math.floor(Math.random() * (hiInt - loInt + 1)) + loInt;
  return rInt / factor;
};
