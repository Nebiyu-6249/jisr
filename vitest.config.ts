import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts', 'packages/**/*.test.ts'],
    // Config is read at module load; tests must not depend on a developer's .env.
    env: {
      NODE_ENV: 'test',
      DATA_ENCRYPTION_KEY: 'dGVzdC1kYXRhLWtleS0zMi1ieXRlcy1sb25nLXBhZCE=',
      SEALING_KEY: 'dGVzdC1zZWFsLWtleS0zMi1ieXRlcy1sb25nLXBhZGRkIQ==',
      PHONE_HMAC_KEY: 'dGVzdC1obWFjLWtleS0zMi1ieXRlcy1sb25nLXBhZGQhIQ==',
    },
  },
  resolve: {
    alias: {
      '@jisr/core': r('./packages/core/src/index.ts'),
      '@jisr/db': r('./packages/db/src/index.ts'),
      '@jisr/ai': r('./packages/ai/src/index.ts'),
      '@jisr/integrations': r('./packages/integrations/src/index.ts'),
    },
  },
});
