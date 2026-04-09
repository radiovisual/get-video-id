const config = [
	{
		ignores: [
			'dist/**',
			'**/*.d.ts',
		],
	},
	{
		languageOptions: {
			globals: {
				test: 'readonly',
				expect: 'readonly',
				describe: 'readonly',
			},
		},
		rules: {
			// URL-parsing regexes pre-date the v flag; keep current semantics.
			'require-unicode-regexp': 'off',
		},
	},
];

export default config;
