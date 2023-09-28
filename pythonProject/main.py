import time
import re
import unittest

from selenium import webdriver
import unittest as ut
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.select import Select
import tracemalloc

class Test(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))

        self.idDict = {
            "age": 12,
            "height": 174.0,
            "weight": 86.0,
            "waist": 86.0,
            "hip": 90.1,
            "neck": 50.0,
            "gender": "female"
        }

        self.expectedValues = {
            "bmi-result": '28.4',
            "bmr-result": '1727',
            "bodyfat-result": '18.9'
        }

    def test_check_if_loads_on_correct_page(self):
        driver = self.driver
        driver.get("http://localhost:8000/")
        self.assertEqual("BMI Calculator", driver.title, "Entry page is not correct")

    def test_run1(self):
        driver = self.driver
        idDict = self.idDict

        driver.get("http://localhost:8000/")

        # Get all inputs
        for key in idDict:
            time.sleep(1)
            if key == "gender":
                input = Select(driver.find_element(By.XPATH, "//select[@id='gender']"))
                input.select_by_value(idDict[key])
            else:
                input = driver.find_element(By.XPATH, "//input[@id='{}']".format(key))
                input.send_keys(idDict[key])

        submit_button = driver.find_element(By.XPATH, "//button[@id='click-me']")

        time.sleep(2)
        submit_button.click()
        time.sleep(2)

        self.assertEqual("BMI Results", driver.title, "NOT THE SAME")
        for key in self.expectedValues:
            result = driver.find_element(By.XPATH, "//p[@id='{}']".format(key))
            self.assertEqual(result.text.split(" ")[1], self.expectedValues[key], "Result not the same, boo")
            print(result.text.split(" ")[1])

        time.sleep(5)

        driver.maximize_window()
        print(driver.title)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    tracemalloc.start()
    unittest.main()
    tracemalloc.stop()