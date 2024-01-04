module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: "module",
		project: "./tsconfig.json",
	},
	plugins: ["@typescript-eslint"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	rules: {
		indent: ["error", "tab"],
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ argsIgnorePattern: "^_" },
		],
	},
	ignorePatterns: ["**/*.js"],
};
