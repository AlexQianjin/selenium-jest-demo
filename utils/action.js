const utils = require('./utils');
const locatorMethod = {id: utils.getElementById, name: utils.getElementByName, xpath: utils.getElementByXpath};

module.exports.openUrl = async (driver, url) => {
    await driver.get(url);
};

module.exports.maximizeWindow = async driver => {
    await driver.manage().window().maximize();
};

module.exports.click = async (driver, by, locator, timeout = 10 * 1000) => {
    const element = await locatorMethod[by](driver, locator, timeout);
    await element.click();

    return element;
};

module.exports.inputText = async (driver, by, locator, txt, timeout = 10 * 1000) => {
    const element = await locatorMethod[by](driver, locator, timeout);
    await element.clear();
    await element.sendKeys(txt);

    return element;
};

module.exports.getText = async (driver, by, locator, timeout = 10 * 1000) => {
    const element = await locatorMethod[by](driver, locator, timeout);
    const value = await element.getText();

    return value;
};

module.exports.getAttributeValue = async (driver, by, locator, timeout = 10 * 1000) => {
    const element = await locatorMethod[by](driver, locator, timeout);
    const value = await element.getAttribute('value');

    return value;
};
