 /// <reference types="vitest" />
 import {defineConfig, mergeConfig} from 'vitest/config'
 import viteConfig from './vite.config.ts'
 
 export default mergeConfig(viteConfig, defineConfig({
    assetsInclude:["**/*.MID", "*.ogg"],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/setupTests.ts'],
        // Fix for React Testing Library + Vite Test
        // @see https://stackoverflow.com/questions/77611978/invalid-chai-property-in-vitest
        // setupFiles: ['./setupTests.ts']
        // The above just does: import '@testing-library/jest-dom';
    },
 }))
