module.exports = {
  extends: ['next', 'plugin:react-hooks/recommended'],
  settings: {
    next: {
      rootDir: [
        'apps/admin/',
        'packages/ui/',
        'packages/config/',
        'packages/tsconfig/',
      ],
    },
  },
}
