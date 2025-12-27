import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
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
			eslintConfigPrettier,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'eqeqeq': ['error', 'always'], // Требовать === вместо ==
			'prefer-const': 'error',
			// 'no-console':
			//     process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		},
	},
])
