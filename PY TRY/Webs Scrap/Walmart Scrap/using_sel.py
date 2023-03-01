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

links = pd.read_csv("walmart_500.csv")
all_links = links['URL']

for i in range(5):
    browser.get("https://www.walmart.com")
    time.sleep(5)
    browser.get(all_links[i])
    page_source = browser.page_source

    with open(f"scraped_data{i}.txt", "w+") as f:
        f.write(page_source)


