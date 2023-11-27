module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      excludedFiles: ['.eslintignore'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 0,
    'react/function-component-definition': [1, { namedComponents: 'arrow-function' }],
    'import/extensions': 'off',
    'no-console': 0,
    // 'jsx-a11y/click-events-have-key-events': 'off',
    // 'jsx-a11y/no-noninteractive-element-interactions': 'off',
  },
};
