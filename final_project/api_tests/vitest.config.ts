import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globalSetup: ['./src/hooks/vitest-global-setup.ts'],
        setupFiles: [
            './src/hooks/test-setup.ts',
            './src/hooks/network-logger.ts',
            'allure-vitest/setup'
        ],
        include: ['tests/**/?(*.)+(spec|test).[t]s?(x)'],
        exclude: ['node_modules', 'dist'],
        testTimeout: 120000,

        reporters: [
            'verbose',
            ['allure-vitest/reporter', { resultsDir: 'allure-results'}]
        ]

    }
});

