'''
Using Selenium to Get Walmart Data
'''

from selenium import webdriver
from bs4 import BeautifulSoup
import time
import pandas as pd

browser = webdriver.Chrome("/usr/local/bin/chromedriver")

# TO OPEN IN INCOGNITO WITH HEAD
# options = webdriver.ChromeOptions()
# options.add_argument('--ignore-certificate-errors')
# options.add_argument('--incognito')
# options.add_argument('--headless')
# browser = webdriver.Chrome("/usr/local/bin/chromedriver", options=options)

name = "Dinesh Koirala"
email = "marketinginnepal7@gmail.com"
comment = "These are really cool ideas for small business. What do you think? What can be great business ideas to start after Lockdown?"
website = "https://marketinginnepal.com/business-ideas-in-nepal-after-lockdown/"

links = pd.read_csv("links.csv")
all_links = links['URL']

for i in range(len(all_links)):
    browser.get(all_links[i])
    time.sleep(10)

    cmt = browser.find_element_by_id('comment')
    cmt.clear()
    cmt.send_keys(comment)

    aut = browser.find_element_by_id('author')
    aut.clear()
    aut.send_keys(name)

    ema = browser.find_element_by_id('email')
    ema.clear()
    ema.send_keys(email)

    web = browser.find_element_by_id('url')
    web.clear()
    web.send_keys(website)

    browser.find_element_by_id("submit").click()






