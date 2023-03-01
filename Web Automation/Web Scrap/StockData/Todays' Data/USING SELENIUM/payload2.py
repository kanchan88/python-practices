from selenium import webdriver
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import csv
from selenium.webdriver.support.ui import WebDriverWait  # for implicit and explict waits
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import *


browser = webdriver.Chrome('/usr/local/bin/chromedriver',)
browser.get("http://nepalstock.com/todaysprice")


# TO OPEN IN INCOGNITO WITH HEAD
"""
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
options.add_argument('--headless')
driver = webdriver.Chrome("/usr/lib/chromium-browser/chromedriver", chrome_options=options)
"""


limitpages =  12
output_rows = []

i=0
for i in range(1,limitpages):
    page_source = browser.page_source
    output_rows = []
    soup = BeautifulSoup(page_source, 'html.parser')
    table = soup.find("table", { "class" : "table table-condensed table-hover" })
    date = table.label.text[6:16]
    print(date)
    for row in table.findAll("tr"):
        columns = row.findAll('td')
        output_row = []
        for column in columns:
            if column.text not in output_row:
                output_row.append(column.text)
        output_rows.append(output_row)
        print(output_rows)
    with open('stockdata'+date+'.csv', 'a+') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(output_rows[2:20])

    browser.find_element_by_xpath("//a[@Title='Next Page']").click()
