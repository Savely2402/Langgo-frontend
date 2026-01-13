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
            globals: { ...globals.browser },
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
            'object-curly-newline': [
                'error',
                {
                    ObjectExpression: { multiline: true, minProperties: 2 },
                    ObjectPattern: { multiline: true, minProperties: 3 },
                    ImportDeclaration: { multiline: false, minProperties: 4 },
                    ExportDeclaration: { multiline: true, minProperties: 4 },
                },
            ],
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['../**'],
                            message:
                                'Do not use parent relative imports. Use @/ alias instead.',
                        },
                    ],
                },
            ],
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
])
