const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
// const firefox = require('selenium-webdriver/firefox');
// firefox.setDefaultService(new firefox.ServiceBuilder('/usr/local/bin/geckodriver')).build();

// const firefox = require('selenium-webdriver/firefox');

// let options = new firefox.Options()
//     .setBinary('/usr/local/bin/geckodriver');

const getElementById = async (driver, id, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByName = async (driver, name, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByXpath = async (driver, xpath, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

(async () => {
    try {
        const capabilities = {browserName: 'firefox'};
        driver = new webdriver.Builder()
        // .forBrowser('firefox')
        // .setFirefoxOptions(options)
        .withCapabilities(capabilities)
        // .usingServer('http://10.0.2.15:4444/wd/hub')
        .build();  // Specify Your Local Browser
    
        // eslint-disable-next-line no-undef
        await driver.get(`https://cn.bing.com`);
    
        // await driver.sleep(5 * 1000);
        const inpf = await getElementById(driver, 'sb_form_q');
        await inpf.clear();
        await inpf.sendKeys("Selenium");
    
        const btn = await getElementById(driver, 'sb_form_go');
        await btn.click();
    
        const output = await getElementByXpath(
          driver,
          '/html/body/header/nav/ul/li[1]/a' 
        );
        const outputVal = await output.getText();
        console.log(outputVal, 50)
      } catch (error) {
          console.log(error, 30);
      }
})();

