import time
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from threading import Thread

browsers = [
            DesiredCapabilities.FIREFOX,
            DesiredCapabilities.CHROME
]

#create webdriver
def createDriver(caps):
    return webdriver.Remote(command_executor='http://10.0.2.15:4444/wd/hub',desired_capabilities=caps)

def start_test(driver):
    time.sleep(3)
    driver.get("http://www.baidu.com")
    driver.find_element_by_id("kw").send_keys("python")
    driver.find_element_by_id("su").click()
    time.sleep(3)
    driver.quit()

#start test
def test_on_nodes():
    threads = []
    for bw in browsers:
        driver = createDriver(bw)
        t = Thread(target=start_test, args=(driver,))
        threads.append(t)

    for t in threads:
        t.start()

    for t in threads:
        t.join()

    print("run complete")

if __name__ == '__main__':
    test_on_nodes()