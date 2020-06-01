const fs = require('fs');
const superagent = require('superagent');
// const { BlobServiceClient } = require('@azure/storage-blob');
// const { config } = require('./utils');

require('dotenv').config();

function getTestSuitesResult(result) {
    let testSuitesResult = [];
    if (result.numFailedTestSuites !== 0) {
        testSuitesResult.push(`**${result.numFailedTestSuites}** failed`);
    }
    if (result.numPendingTestSuites !== 0) {
        testSuitesResult.push(`**${result.numPendingTestSuites}** skipped`);
    }
    if (result.numPassedTestSuites !== 0) {
        testSuitesResult.push(`**${result.numPassedTestSuites}** passed`);
    }
    testSuitesResult.push(`**${result.numFailedTestSuites + result.numPassedTestSuites}** of **${result.numTotalTestSuites}** total`);

    return testSuitesResult.join(', ');
}

function getTestResult(result) {
    let testsResult = [];
    if (result.numFailedTests !== 0) {
        testsResult.push(`**${result.numFailedTests}** failed`);
    }
    if (result.numPendingTests !== 0) {
        testsResult.push(`**${result.numPendingTests}** skipped`);
    }
    if (result.numPassedTests !== 0) {
        testsResult.push(`**${result.numPassedTests}** passed`);
    }
    testsResult.push(`**${result.numFailedTests + result.numPassedTests}** of **${result.numTotalTests}** total`);

    return testsResult.join(', ');
}

function getExecutionTime(result) {
    let timeElapsed = (result.endTime - result.startTime) / 1000;

    return `**${timeElapsed}s**`;
}

function convertTestResultToTeamsMessage(result) { // , filename
    let dateTime = new Date().toUTCString();
    console.log(
        'convertTestResultToTeamsMessage: \n' + JSON.stringify(result, null, 2)
    );
    let message = {
        sender: 'Enterprise Learning Automation',
        summary: `${result.numTotalTests} test cases run completed`,
        title: null,
        text: null,
        sections: [
            {
                title: '## Enterprise Learning Automation Testing Result',
                text: '',
                markdown: true,
                facts: [
                    {
                        name: 'Test Suites:',
                        value: getTestSuitesResult(result)
                    },
                    {
                        name: 'Tests:',
                        value: getTestResult(result)
                    },
                    {
                        name: 'Snapshots:',
                        value: `**${result.snapshot.total}** total`
                    },
                    {
                        name: 'Time:',
                        value: getExecutionTime(result)
                    }
                ],
                images: null,
                activityTitle: `**Automation** | [AlexQin](mailto:alex.qin@aveva.com) triggered automation test plan run completed at ${dateTime}`,
                activitySubtitle:
                '**Automation completed.** Trigger: mannually.',
                activityText: null,
                activityImage:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNvyMY98AAAJRSURBVFhH7Ze7qxpBFIfzz/osfGCjtYVaqGAjghba+CcI2lgpiBY2YhJIjGTvVbO5FyN7972bMzCBi/eMzu7s5sX+4CuEnXM+h3HO+i4Wi7n/EpFw2ETCYROYcCKRcJrN5tfJZHKczWY2YI5GI6lSqRzi8biDrfFDIMLFYvFlu90+GoZhOY5juzQ2RNd1Yz6ff8nlcjq21ivCwrVa7RnyjToys9/vj6VS6QWr4QUhYdg1bbfbPVGnm4GddxaLhZRMJm2sFi9Cwt1uVwYPkzrdDTkh1WpVxmrxIiQsSdJH6sKd9Xr9HqvFi5Dw+XxWqAd34AgpWC1ehIQty6Ia/JFlGa3Fi5Cwqqp3b4frwDE6YbV4ERJeLpcfqAd3YJj8uTNcLpc1GAwqdbkbRVF+5PN5E6vFi5BwKpWyptPpw+vpxoppmvpgMDiJjmkhYUI6nbZXq9UnGMvofQxfxtU0zRiPx59haAi/UwgLE0DE6nQ6581m8why32FAkMFmwY/yCOf81Gg0nrB1fghE+BdwRMxsNmsVCgUXcDKZjEm+DPasXwIV/h3838KswHWl1Ov1Z+wGIEei1+vJMBU1+vibXK+5RSDCJJfLRYUf1+F6Tb/fP5Bbgj6G5nrNLQITJoEhorVaLZnsNNlZIgs3xk1ZEqwXi0CFSWCntXa7/TAcDo+ws1zvylgvFoELk8BOm+T/Hf14N1gvFqEIew3Wi0Uk7CdYLxaRsJ9gvVhEwn6C9WIRCfsJ1otFJOwnWC8WnoThvTYUsF4sPAn/DUTCYRMJh0vM/QnsePNT7GbEdwAAAABJRU5ErkJggg=='
            }
        ]
        // ,
        // potentialAction: [
        //     {
        //         '@type': 'OpenUri',
        //         name: 'View Report',
        //         targets: [
        //             { 'os': 'default', 'uri': `${config.AZURE_STORAGE_URL}${filename}` }
        //         ]
        //     }
        // ]
    };

    return message;
}

function sendMessagesToTeams(message) {
    console.log(
        'sendMessagesToTeams message: \n' + JSON.stringify(message, null, 104)
    );

    return superagent
        .post(process.env.TEAMS_WEBHOOK_URL)
        .set('Content-Type', 'application/json; charset=utf-8')
        .send(message)
        .then(function (response) {
            console.log(
                'sendMessagesToTeams success: \n' +
                    JSON.stringify(response, null, 2)
            );
        })
        .catch(function (err) {
            console.log(
                'sendMessagesToTeams failed: \n' + JSON.stringify(err, null, 2)
            );
        });
}

// async function uploadReport(blobName, localFilePath) {
//     const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
//     const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

//     // Create a container
//     const containerName = '$web';
//     const containerClient = blobServiceClient.getContainerClient(containerName);

//     // Create a blob
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//     // Parallel uploading with BlockBlobClient.uploadFile() in Node.js runtime
//     // BlockBlobClient.uploadFile() is only available in Node.js
//     try {
//         await blockBlobClient.uploadFile(localFilePath, {
//             blockSize: 4 * 1024 * 1024, // 4MB block size
//             concurrency: 20, // 20 concurrency
//             blobHTTPHeaders: { blobContentType: 'text/html' },
//             onProgress: ev => console.log(ev)
//         });
//         console.log('uploadFile succeeds');
//     } catch (err) {
//         console.log(
//             `uploadFile failed, requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}`
//         );
//     }
// }

class MyCustomReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
    }

    onRunComplete(contexts, results) {
        // console.log('Custom reporter output:');
        // console.log('GlobalConfig: ', this._globalConfig);
        // console.log('Options: ', this._options);
        let filePath = `${this._options.publicPath}/${this._options.filename}`;
        let filename = this._options.filename;

        if (!process.env.TEAMS_WEBHOOK_URL) {
            console.log('Please config the TEAMS_WEBHOOK_URL env in the .env file');
            return;
        }

        fs.stat(filePath, function (err, stat) {
            if (err === null) {
                console.log(stat);
                // Exist
                console.log('file exists');
                // console.log(JSON.stringify(results.testResults), 18);
                // if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
                //     uploadReport(filename, filePath).catch(error => {
                //         console.log(error, 176);
                //     });
                // } else {
                //     console.log('Please config the AZURE_STORAGE_CONNECTION_STRING env in the .env file');
                // }

                let message = convertTestResultToTeamsMessage(results, filename);
                sendMessagesToTeams(message);
            } else if (err.code === 'ENOENT') {
                // NO exist
                console.log('file doesnt exist');
            }
        });
    }
}

module.exports = MyCustomReporter;
