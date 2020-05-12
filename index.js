const { Builder,until, By } = require('selenium-webdriver');
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

const baidu_search = async driver => {
    try {
    // eslint-disable-next-line no-undef
        await driver.get('https://cn.bing.com');

        const inpf = await getElementById(driver, 'sb_form_q');
        await inpf.clear();
        await inpf.sendKeys('Selenium');

        const btn = await getElementById(driver, 'sb_form_go');
        await btn.click();

        const output = await getElementByXpath(
            driver,
            '/html/body/header/nav/ul/li[1]/a',
            5 * 1000
        );
        const outputVal = await output.getText();
        console.log(outputVal, 50);

        await driver.quit();
    } catch (error) {
        console.log(error, 30);
    }
};

(async () => {
    try {
        const browsers = [{browserName: 'chrome'}, {browserName: 'firefox'}];
        browsers.forEach(browser => {
            console.log(browser, 56);

            // const capabilities = {browserName: 'firefox'};
            let driver = new Builder()
            // .forBrowser('firefox')
                .usingServer('http://10.0.2.15:4444/wd/hub')
                .withCapabilities(browser)
            // .setFirefoxOptions(options)
                .build();  // Specify Your Local Browser

            baidu_search(driver);
        });
    } catch (error) {
        console.log(error, 30);
    }
})();

