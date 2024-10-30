import pluginJs from '@eslint/js';

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
		ignores: ['node_modules/**', 'commitlint.config.js', 'bin/**'],
	},
	pluginJs.configs.recommended,
];
