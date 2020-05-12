const { Builder, until, By } = require('selenium-webdriver');
require('dotenv').config();
// const firefox = require('selenium-webdriver/firefox');
// firefox.setDefaultService(new firefox.ServiceBuilder('/usr/local/bin/geckodriver')).build();

// const firefox = require('selenium-webdriver/firefox');

// let options = new firefox.Options()
//     .setBinary('/usr/local/bin/geckodriver');

const getElementById = async (driver, id, timeout = 2000) => {
    const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};

// const getElementByName = async (driver, name, timeout = 2000) => {
//     const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
//     return await driver.wait(until.elementIsVisible(el), timeout);
// };

const getElementByXpath = async (driver, xpath, timeout = 2000) => {
    const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};

describe('Selenium Jest Demo', () => {
    let driver;

    beforeAll(async () => {
        try {
        // const capabilities = {browserName: 'chrome'};
            driver = new Builder()
                .forBrowser('chrome')
            // .setFirefoxOptions(options)
            // .withCapabilities(capabilities)
            // .usingServer('http://10.0.2.15:4444/wd/hub')
                .build();  // Specify Your Local Browser
            await driver.manage().window().maximize();

            // eslint-disable-next-line no-undef
            await driver.get('https://cn.bing.com');
        // await driver.get(
        //     `https://test-experience.test-connect.aveva.com/`,
        //     );
        } catch (error) {
            console.log(error, 30);
        }

    }, 10000);

    afterAll(async () => {
        await driver.quit();
    }, 15000);

    test('Get URL config value from env file', () => {
        let url = process.env.TEST_ENV_URL;
        expect(url).toBe('https://test-experience.test-connect.aveva.com');
    });

    test('Get username config value from env file', () => {
        let url = process.env.TEST_USERNAME;
        expect(url).toBe('qinhe@wistronits.com');
    });

    test('Search Selenium in the Bing', async () => {
        try {
            const inpf = await getElementById(driver, 'sb_form_q');
            await inpf.clear();
            await inpf.sendKeys('Selenium');

            const btn = await getElementById(driver, 'sb_form_go');
            await btn.click();

            const output = await getElementByXpath(
                driver,
                '/html/body/header/nav/ul/li[1]/a'
            );
            const outputVal = await output.getText();
            console.log(outputVal, 50);
            expect(outputVal).toBe('WEB');
        } catch (error) {
            console.log(error, 59);

        }
    }, 100 *1000);
});