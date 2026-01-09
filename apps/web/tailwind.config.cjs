const shared = require('../../configs/tailwind.shared.cjs');

module.exports = {
  presets: [shared],
  content: ['./index.html', './src/**/*.{ts,tsx}']
};
