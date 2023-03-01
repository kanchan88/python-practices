from selenium import webdriver
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import csv
from selenium.webdriver.support.ui import WebDriverWait  # for implicit and explict waits
from selenium.webdriver.chrome.options import Options


browser = webdriver.Chrome('/usr/local/bin/chromedriver',)
browser.get("http://nepalstock.com/stockWisePrices")


# TO OPEN IN INCOGNITO WITH HEAD
"""
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
options.add_argument('--headless')
driver = webdriver.Chrome("/usr/lib/chromium-browser/chromedriver", chrome_options=options)
"""

startDate = browser.find_element_by_id('startDateStockWise')
startDate.clear()
startDate.send_keys('03/03/2020')
startDate.click()

endDate = browser.find_element_by_id('endDateStockWise')
endDate.clear()
endDate.send_keys('03/03/2021')
endDate.click()

myStock= Select(browser.find_element_by_id("stock-symbol"))
myStock.select_by_value("341")


selectNumber = Select(browser.find_element_by_name("_limit"))
selectNumber.select_by_value("200")

browser.find_element_by_id("stocksubmit").click()


page_source = browser.page_source

cell=[]
i=0
output_rows = []
soup = BeautifulSoup(page_source, 'html.parser')
table = soup.find("table", { "class" : "table table-condensed table-hover" })
for row in table.findAll("tr"):
    columns = row.findAll('td')
    output_row = []
    for column in columns:
        output_row.append(column.text)
    output_rows.append(output_row)

    with open('gbime.csv', 'w') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(output_rows)


"""
cell = str(cells)
res = cell.replace('<td class="alnright">', '').replace('<td>', '').replace('</td>','')
"""


