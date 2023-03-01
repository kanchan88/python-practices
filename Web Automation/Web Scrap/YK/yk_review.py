from selenium import webdriver
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import csv
from selenium.webdriver.support.ui import WebDriverWait  # for implicit and explict waits
from selenium.webdriver.chrome.options import Options


browser = webdriver.Chrome('/usr/local/bin/chromedriver',)
browser.get("https://yourkoseli.com/product/tempting-red-velvet-cake/")


# TO OPEN IN INCOGNITO WITH HEAD
"""
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
options.add_argument('--headless')
driver = webdriver.Chrome("/usr/lib/chromium-browser/chromedriver", chrome_options=options)
"""

div = browser.find_element_by_link_text("5").click()

comment = browser.find_element_by_id("comment")
comment.send_keys("Your Koseli provides the best Cakes in Nepal. They are the best Online cake delivery service provider in Nepal")

author = browser.find_element_by_id("author")
author.send_keys("Garima Panta")

email = browser.find_element_by_id("email")
email.send_keys("garimapanta@outlook.com")

browser.find_element_by_id("submit").click()



