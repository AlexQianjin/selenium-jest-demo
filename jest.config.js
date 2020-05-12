module.exports = {
    verbose: true,
    reporters: [
        'default',
        ['jest-html-reporters', {
            'publicPath': './html-report',
            'filename': `report-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.html`,
            'expand': true
        }]
    ]
};
