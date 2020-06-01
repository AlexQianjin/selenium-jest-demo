const { Builder, until, By } = require('selenium-webdriver');
const config = require('./config');

module.exports.getDriver = () => {
    if (config.BROWSER.toLowerCase() === 'chrome') {
        const chrome = require('selenium-webdriver/chrome');
        chrome.setDefaultService(new chrome.ServiceBuilder(config.DRIVER_PATH_CHROME).build());
        const driver = new Builder()
            .forBrowser('chrome')
        // .setFirefoxOptions(options)
        // .withCapabilities(capabilities)
        // .usingServer('http://10.0.2.15:4444/wd/hub')
            .build(); // Specify Your Local Browser
        return driver;
    }
};

module.exports.getElementById = async (driver, id, timeout = 10 * 1000) => {
    const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};

module.exports.getElementByName = async (driver, name, timeout = 10 * 1000) => {
    const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};

module.exports.getElementByXpath = async (driver, xpath, timeout = 10 * 1000) => {
    const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};
