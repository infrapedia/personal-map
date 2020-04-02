module.exports = {
  plugins: {
    'postcss-easy-import': {},
    'postcss-preset-env': {
      stage: 0,
    },
    'postcss-url': {
      url: 'inline',
    },
    'postcss-mixins': {},
    'postcss-simple-vars': {},
    'postcss-nested': {},
  },
  module: true,
  url: false,
};
