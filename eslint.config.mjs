import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
	{
		rules: {
			'no-console': 'warn',
			'prefer-const': 'error',
			'no-unused-vars': 'warn',
		},
	},
	{
		files: ['*/**/*.ts'],
	},
	{
		languageOptions: { globals: globals.node },
	},
	{
		ignores: ['node_modules/**', 'dist/**', 'commitlint.config.js'],
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
