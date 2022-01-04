module.exports = {
  env: {
    browser: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['src/generated'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
