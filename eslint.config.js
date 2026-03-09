// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import eslintConfigPrettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
            eslintConfigPrettier,
        ],
        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'eqeqeq': ['error', 'always'],
            'prefer-const': 'error',
            'import/order': [
                'error',
                {
                    'groups': [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'type',
                        'unknown',
                    ],
                    'pathGroups': [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: '*.css',
                            group: 'unknown',
                            position: 'after',
                        },
                    ],
                    'pathGroupsExcludedImportTypes': ['react'],
                    'newlines-between': 'never',
                    'alphabetize': {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    'warnOnUnassignedImports': true,
                },
            ],
            // 'no-console':
            //     process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        },
    },
    ...storybook.configs['flat/recommended'],
])
