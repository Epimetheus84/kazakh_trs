module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint',
    },
    env: {
      browser: true,
      node: true,
    },
    extends: [
      'plugin:react/recommended',
      'airbnb-base',
    ],
    settings: {
      'import/resolver': 'webpack',
    },
    ignorePatterns: [
      '**/*.min.js',
    ],
    rules: {
      /*
        'off': 0,
        'warn': 1,
        'error': 2
       */
      camelcase: 'warn',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'max-len': ['error', {
        code: 120,
        ignorePattern: 'd="([\\s\\S]*?)"',
      }],
      'no-plusplus': 'off',
      'no-param-reassign': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
      'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    },
  };
  