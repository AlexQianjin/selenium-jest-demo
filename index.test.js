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

describe('webdriver', () => {
  let driver;

  beforeAll(async () => {
      try {
        driver = new webdriver.Builder().forBrowser('firefox')
        // .setFirefoxOptions(options)
        .build();  // Specify Your Local Browser

        // eslint-disable-next-line no-undef
        await driver.get(`https://www.baidu.com`);
      } catch (error) {
          console.log(error, 30);
      }

  }, 10000);

  afterAll(async () => {
    await driver.quit();
  }, 15000);

  test('test', async () => {
 try {
    const inpf = await getElementById(driver, 'kw');
    await inpf.clear();
    await inpf.sendKeys("Selenium");

    const btn = await getElementById(driver, 'su');
    await btn.click();



    const output = await getElementByXpath(
      driver,
      '/html/body/div[1]/div[3]/div[1]/div[3]/div[1]/h3/a'
    );
    const outputVal = await output.getText();
    console.log(outputVal, 50)
    expect(outputVal).toContains("Selenium");

 } catch (error) {
     console.log(error, 59);

 }

  }, 10000);
});