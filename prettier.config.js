module.exports = {
    // These settings are duplicated in .editorconfig:
    tabWidth: 2, // indent_size = 2
    useTabs: false, // indent_style = space
    endOfLine: 'lf', // end_of_line = lf
    semi: false, // default: true
    singleQuote: true, // default: false
    printWidth: 100, // default: 80
    trailingComma: 'all',
    bracketSpacing: true,
    overrides: [
        {
            files: '*.js,*.jsx,*.ts,*.tsx',
            options: {
                parser: 'flow',
            },
        },
    ],
}
