export default {
  test: {
    globals: true,
    environment: 'node',
    watchExclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.git/**',
      '**/!(**/*.test.js)'  // Ignore everything except test files
    ],
    testMatch: [
      '**/*.test.js'
    ]
  },
}
