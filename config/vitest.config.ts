import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    setupFiles: ['src/test/setup.ts'],
    globals: true,
    testTimeout: 30000, // Increase timeout for browser tests
    hookTimeout: 30000,
  },
}) 