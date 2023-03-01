import requests
from urllib.parse import urlparse
import re
import csv
import pandas

data = []
input = pandas.read_csv("input.csv")
for inputs in input['url']:
    r = requests.get(inputs) 
    domain = urlparse(r.url).netloc
    cleaned = domain.replace(r".com", "")
    cleaned = cleaned.replace(r"www.","")
    data.append(cleaned)
    
header= ['url','company']
with open('output.csv', 'w', encoding='UTF8') as f:
    writer = csv.writer(f)

    # write the header
    writer.writerow(header)

    # write the data
    for i in range(0,len(data)):
        writer.writerow([input['url'][i],data[i]])
