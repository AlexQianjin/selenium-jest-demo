const { utils, action, config, locator} = require('../utils');

require('dotenv').config();
/* global fail */

xdescribe('Selenium Jest Demo', () => {
    let driver;

    beforeAll(async () => {
        try {
            driver = utils.getDriver();
            await action.maximizeWindow(driver);
            await action.openUrl(driver, 'https://cn.bing.com');
        } catch (error) {
            console.log(error, 30);
        }
    }, 10 * 1000);

    afterAll(async () => {
        await driver.quit();
    }, 10 * 1000);

    test('Get URL config value from env file', () => {
        let url = config.TEST_ENV_URL;
        expect(url).toBe('https://test-experience.test-connect.aveva.com');
    });

    test('Get username config value from env file', () => {
        let url = process.env.TEST_USERNAME;
        expect(url).toBe('qinhe@wistronits.com');
    });

    test('Search Selenium in the Bing', async () => {
        try {
            await action.inputText(driver, 'id', locator.bingSearchTextInput, 'Selenium');
            await action.click(driver, 'id', locator.bingSearchButton);

            const outputVal = await action.getText(driver, 'xpath', locator.bingWebResult);
            console.log(outputVal, 50);
            expect(outputVal).toBe('WEB');
        } catch (error) {
            console.log(error, 59);
            fail(error);
        }
    }, 100 * 1000);
});
