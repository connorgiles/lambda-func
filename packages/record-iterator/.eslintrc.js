module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['*.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  }
}
