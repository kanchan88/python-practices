import requests

url = 'graph.facebook.com/8308567489/media'

myobj = {
'image_url': 'img.jpg',
'caption':'Hey'
}

requests.post(url=url, data = myobj)


