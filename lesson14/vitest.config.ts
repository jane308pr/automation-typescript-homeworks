
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        setupFiles: ['./src/hooks/vitest-global-setup.ts'],
        include: ['tests/**/?(*.)+(spec|test).[t]s?(x)'],
        exclude: ['node_modules', 'dist'],
        testTimeout: 120000
    }
});

