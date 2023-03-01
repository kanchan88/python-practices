from selenium import webdriver
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import csv
from selenium.webdriver.support.ui import WebDriverWait  # for implicit and explict waits
from selenium.webdriver.chrome.options import Options


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

selectNumber = Select(browser.find_element_by_name("_limit"))
selectNumber.select_by_value("300")

filter_button = browser.find_elements_by_xpath("//input[@type='submit' and @value='Filter']")[0]
filter_button.click()


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
        output_row.append(column.text)
    output_rows.append(output_row)

    with open('stockdata'+date+'.csv', 'w') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(output_rows[2:212])
