module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
    env: {
      es2017: true,
    },
  },
};
