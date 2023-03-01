from urllib.request import urlopen as uReq
from urllib.request import Request
from bs4 import BeautifulSoup as soup

for j in range(1,20):
    url2fetch = Request('https://www.hamrodoctor.com/blood_donors/index/page:j', headers={'User-Agent': 'Mozilla/5.0'})

#open connection and grab data
uClient = uReq(url2fetch)
page_html = uClient.read()
uClient.close()

#handle HTMLs
page_soup = soup(page_html,"html.parser") 

#grabbing required DIV Tag

allData = page_soup.findAll("div",{"class":"donarcontact"})
i=1
for i in range(1,len(allData),2):
    telNumbers = allData[i].a["href"]
    numbers =telNumbers[4:]
    print(" ",numbers)
