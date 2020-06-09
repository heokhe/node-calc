const SIN_MAP = new Map([
  [0, 0], [30, 0.5], [45, Math.sqrt(2) / 2], [60, Math.sqrt(3) / 2], [90, 1]
]);
const COS_MAP = new Map([[45, Math.sqrt(2) / 2], [60, 0.5]]);

function sin(x) {
  x %= 360;
  if (x < 0) return sin(360 - x);
  if (x > 180) return -sin(x - 180);
  if (x > 90 && x <= 180) return sin(180 - x);
  if (SIN_MAP.has(x)) return SIN_MAP.get(x);
  return Math.sin(x * Math.PI / 180);
}

function cos(x) {
  x %= 360;
  if (x < 0) return cos(-x);
  if (x > 90 && x < 270) return -cos(180 - x);
  if (x >= 270) return cos(x - 360);
  if (COS_MAP.has(x)) return COS_MAP.get(x);
  return Math.sqrt(1 - (sin(x) ** 2));
}

function tan(x) {
  return sin(x) / cos(x);
}

function cot(x) {
  return 1 / tan(x);
}

module.exports = {
  sin, cos, tan, cot
};
