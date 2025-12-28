/** @type {import("prettier").Config} */
const config = {
    trailingComma: 'all',
    semi: false,
    tabWidth: 4,
    useTabs: false,
    singleQuote: true,
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    endOfLine: 'lf',
    jsxSingleQuote: false,
    quoteProps: 'consistent',
    overrides: [
        {
            files: '*.json',
            options: {
                tabWidth: 2,
                singleQuote: false,
            },
        },
    ],
}

export default config
