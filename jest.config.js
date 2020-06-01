const reportConfig = {
    'publicPath': './html-report',
    'filename': `report-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.html`
};
const htmlReportConfig = Object.assign({}, reportConfig, { 'expand': true });

module.exports = {
    verbose: true,
    reporters: [
        'default',
        ['jest-html-reporters', htmlReportConfig],
        ['./jest-custom-reporter.js', reportConfig]
    ]
};
