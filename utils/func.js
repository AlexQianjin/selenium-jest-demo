const action = require('./action');
const config = require('./config');
const locator = require('./locator');

module.exports.login = async driver => {
    await action.maximizeWindow(driver);
    await action.openUrl(driver, config.TEST_ENV_URL);
    await driver.sleep(5000);

    let username = process.env.TEST_USERNAME;
    let password = process.env.TEST_PASSWORD;
    let index = username.toLowerCase().indexOf('@aveva.com');
    if (index === -1) {
        // Login to AVEVA Cloud Traning Center with non-aveva account
        await action.inputText(driver, 'id', locator.loginUsername, username);
        await action.inputText(driver, 'id', locator.loginPassword, password);
        await action.click(driver, 'id', locator.loginSubmit);
        await driver.sleep(5000);
    } else {
        // Login to AVEVA Cloud Traning Center with aveva account
        await action.inputText(driver, 'id', locator.loginUsername, username);
        await action.click(driver, 'id', locator.loginSubmit);
        await driver.sleep(3000);
        await action.inputText(driver, 'id', locator.loginAvevaPassword, password);
        await action.click(driver, 'id', locator.loginAvevaSubmit);
        await driver.sleep(2000);
        await action.click(driver, 'id', locator.loginMicrosoftNo);
        await driver.sleep(5000);
    }
};

module.exports.adminLogin = async driver => {
    let username = process.env.ADMIN_USERNAME;
    let password = process.env.ADMIN_PASSWORD;
    await action.inputText(driver, 'id', locator.loginUsername, username);
    await action.click(driver, 'id', locator.loginSubmit);
    await driver.sleep(3000);
    await action.inputText(driver, 'id', locator.loginAvevaPassword, password);
    await action.click(driver, 'id', locator.loginAvevaSubmit);
    await driver.sleep(2000);
    await action.click(driver, 'id', locator.loginMicrosoftNo);
    await driver.sleep(5000);
};

module.exports.studentLogin = async driver => {
    let username = process.env.TEST_USERNAME;
    let password = process.env.TEST_PASSWORD;
    await action.click(driver, 'id', locator.loginUsername);
    await action.inputText(driver, 'id', locator.loginUsername, username);
    await action.inputText(driver, 'id', locator.loginPassword, password);
    await action.click(driver, 'id', locator.loginSubmit);
    await driver.sleep(5000);
};
