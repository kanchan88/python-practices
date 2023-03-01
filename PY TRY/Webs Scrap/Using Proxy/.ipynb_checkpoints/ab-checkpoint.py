{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "#### Listing URLS selling Laptop"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "import requests\n",
    "from bs4 import BeautifulSoup\n",
    "import urllib\n",
    "import pandas as pd\n",
    "from requests_html import HTMLSession\n",
    "import csv"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [],
   "source": [
    "query = \"dell p2719h price in india\""
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "def get_source(url):\n",
    "    \"\"\"Return the source code for the provided URL. \n",
    "\n",
    "    Args: \n",
    "        url (string): URL of the page to scrape.\n",
    "\n",
    "    Returns:\n",
    "        response (object): HTTP response object from requests_html. \n",
    "    \"\"\"\n",
    "    try:\n",
    "        session = HTMLSession()\n",
    "        response = session.get(url)\n",
    "        return response\n",
    "\n",
    "    except requests.exceptions.RequestException as e:\n",
    "        print(e)\n",
    "\n",
    "def scrape_google(query):\n",
    "    \"\"\" Returns the links of top 10 google searches\n",
    "    Input: Google Quer you want to make\n",
    "    \"\"\"\n",
    "\n",
    "    query = urllib.parse.quote_plus(query)\n",
    "    response = get_source(\"https://www.google.com/search?q=\" + query)\n",
    "\n",
    "    links = list(response.html.absolute_links)\n",
    "    google_domains = ('https://www.google.', \n",
    "                      'https://google.', \n",
    "                      'https://webcache.googleusercontent.', \n",
    "                      'http://webcache.googleusercontent.', \n",
    "                      'https://policies.google.',\n",
    "                      'https://support.google.',\n",
    "                      'https://maps.google.',\n",
    "                      \"https://translate.google.\"\n",
    "                     )\n",
    "\n",
    "    for url in links[:]:\n",
    "        if url.startswith(google_domains):\n",
    "            links.remove(url)\n",
    "\n",
    "    return links"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [],
   "source": [
    "urls = scrape_google(query)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [],
   "source": [
    "with open(\"urls.csv\", 'w', newline='') as myfile:\n",
    "    wr = csv.writer(myfile)\n",
    "    wr.writerow(urls)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "metadata": {},
   "outputs": [],
   "source": [
    "all_links = urls.copy()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "metadata": {},
   "outputs": [],
   "source": [
    "responses = []\n",
    "\n",
    "for link in all_links:\n",
    "    response = requests.request(\"GET\", f\"http://api.scraperapi.com?api_key=ae939ef3d321a5638cef3e2178304155&url={link}\")\n",
    "    responses.append(response.text)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 14,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,shrink-to-fit=no,maximum-scale=1,user-scalable=0\"/><meta name=\"theme-color\" content=\"#000000\"/><meta name=\"google-site-verification\" content=\"EU8G54_LSqH0OTlvIXRhrV1fnjGDdh0uBoKYraVKE1I\"/><meta property=\"fb:app_id\" content=\"484004418446735\"/><meta property=\"og:site_name\" content=\"Tata CLiQ\"/><meta property=\"al:ios:app_store_id\" content=\"1101619385\"/><meta property=\"al:ios:url\" content=\"https://www.tatacliq.com/\"/><meta property=\"al:ios:app_name\" content=\"Tata Cliq\"/><meta property=\"al:android:package\" content=\"com.tul.tatacliq\"/><meta property=\"al:android:url\" content=\"https://www.tatacliq.com/\"/><meta property=\"al:android:app_name\" content=\"Tata Cliq\"/><meta name=\"fragment\" content=\"!\"/><link rel=\"dns-prefetch\" href=\"https://assets.adobedtm.com\"/><link rel=\"dns-prefetch\" href=\"https://tataunistorelimited.sc.omtrdc.net\"/><link rel=\"dns-prefetch\" href=\"https://tataunistore.demdex.net\"/><link rel=\"dns-prefetch\" href=\"https://tataunistore.tt.omtrdc.net\"/><link rel=\"dns-prefetch\" href=\"https://assets.tatacliq.com\"/><link href=\"https://assets.adobedtm.com\" rel=\"preconnect\"/><link href=\"https://dpm.demdex.net\" rel=\"preconnect\"/><link href=\"https://tataunistorelimited.sc.omtrdc.net\" rel=\"preconnect\"/><link href=\"https://tataunistore.demdex.net\" rel=\"preconnect\"/><link href=\"https://tataunistore.tt.omtrdc.net\" rel=\"preconnect\"/><link href=\"https://assets.tatacliq.com\" rel=\"preconnect\"/><link href=\"https://mboxedge17.tt.omtrdc.net\" rel=\"preconnect\"/><link rel=\"manifest\" href=\"/manifest.json\"/><link rel=\"shortcut icon\" href=\"/favicon.ico\"/><link rel=\"preload\" href=\"/src/assets/fonts/rubik-v7-latin-regular.woff\" as=\"font\" crossorigin=\"anonymous\"/><link rel=\"preload\" href=\"/src/assets/fonts/rubik-v7-latin-500.woff2\" as=\"font\" crossorigin=\"anonymous\"/><link rel=\"preload\" href=\"/src/assets/fonts/rubik-v7-latin-300.woff2\" as=\"font\" crossorigin=\"anonymous\"/><script type=\"text/javascript\">function loadJS(n){var t=document.createElement(\"script\");t.src=n,document.getElementsByTagName(\"body\")[0].appendChild(t)}function postDomContentLoadedFunction(n){return void 0!==window.attachEvent?window.attachEvent(\"DOMContentLoaded\",n):window.addEventListener?window.addEventListener(\"DOMContentLoaded\",n,!1):void 0}function postLoadEventFunction(n){return void 0!==window.attachEvent?window.attachEvent(\"onload\",n):window.addEventListener?window.addEventListener(\"load\",n,!1):void 0}</script><script defer=\"defer\" src=\"/client.088a9524ec39.js\"></script><link href=\"/css/style.309b07bd37c1.css\" rel=\"stylesheet\"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id=\"root\"></div><div id=\"modal-root\"></div><div id=\"toast-root\"></div><div id=\"service-worker-toast-root\"></div><script>ci=\"0002321\",gemErrList=[],gemp=\"index\",window.addEventListener(\"error\",(function(r){if(r.error){var e={};try{e.m=r.message,e.f=r.filename.replace(/(\\r\\n|\\n|\\r)/gm,\"\"),e.l=r.lineno,e.c=r.colno,e.s=r.error.stack,gemErrList.push(e)}catch(r){}}}))</script><script defer=\"defer\" type=\"text/javascript\">var clevertap_account_id=\"867-R5K-8R5Z\",clevertap={event:[],profile:[],account:[],onUserLogin:[],notifications:[],privacy:[]};function clevertapJS(){var e=(\"https:\"==document.location.protocol?\"https://d2r1yp2w7bby2u.cloudfront.net\":\"http://static.clevertap.com\")+\"/js/a.js\";loadJS(e),setTimeout((function(){clevertap.notifications.push({titleText:\"Your favourites are a CLiQ away!\",bodyText:\"Get updates on your favourite brands, the biggest sales and products you love!\",okButtonText:\"Yes, I'm on Board\",rejectButtonText:\"Ask me later\",okButtonColor:\"#a91e3e\",askAgainTimeInSeconds:604800,serviceWorkerPath:\"/service-worker.js\",okCallback:function(){clevertap.event.push(\"Web Push Notifications\",{\"User Accepted\":\"Yes\"})},rejectCallback:function(){clevertap.event.push(\"Web Push Notifications\",{\"User Accepted\":\"No\"})}})}),2e3)}clevertap.account.push({id:clevertap_account_id}),clevertap.privacy.push({optOut:!1}),clevertap.privacy.push({useIP:!1}),postDomContentLoadedFunction(clevertapJS)</script><script>!function(){var t=document.createElement(\"script\");t.type=\"text/javascript\",t.async=!0,t.src=(document.location.protocol,\"https://cdn.epsilondelta.co/static/gemGen.js\");var e=document.getElementsByTagName(\"script\")[0];e.parentNode.insertBefore(t,e)}()</script><script src=\"//assets.adobedtm.com/9fd06d4068c619c47b289b9c496761efd086a233/satelliteLib-5768eb8c6d43533f225815e1e41f7be236249910.js\"></script><script defer=\"defer\" type=\"text/javascript\">window.digitalData=Object.assign({},{page:{category:{primaryCategory:\"home\"},pageInfo:{pageName:\"homepage\",pageType:\"Homepage\"}}}),window._satellite&&_satellite.pageBottom()</script><script>window.onedirectSettings={apiKey:\"NjMyNF8xNTU0Mzg1ODM0MDYyXzQ=\",settings:{widgetPosition:{left:95,bottom:5}}}</script><script>window.od={};var mc=function(){mc.c(arguments)};mc.q=[],mc.c=function(c){mc.q.push(c)},window.od.messenger=mc</script><script>fetch(\"https://msg.onedirect.in/kong/mgateway/public/v1/sdk-version?brandHash=NjMyNF8xNTYyMjE5NzU2Njg3XzQ=&channelId=1\").then(e=>e.json()).then(e=>{!function(n,s,t,o,a){let i=\"https://s3-ap-southeast-1.amazonaws.com/onedirect/messaging/web-sdk/production/\"+e.version+\"/od-messaging.init.v1.0.min.js\";el=s.createElement(t),p=s.getElementsByTagName(t)[0],el.async=1,el.id=\"onedirect-messaging-sdk\",el.src=i,p.parentNode.insertBefore(el,p)}(window,document,\"script\")}).catch(e=>{console.log(e)})</script><script type=\"text/javascript\">\"serviceWorker\"in navigator&&window.addEventListener(\"load\",(function(){navigator.serviceWorker.register(\"/service-worker.js\").then((function(e){console.log(\"ServiceWorker registration successful with scope: \",e.scope)}),(function(e){console.log(\"ServiceWorker registration failed: \",e)}))}))</script><span itemscope=\"itemscope\" itemtype=\"https://www.schema.org/SiteNavigationElement\"><link itemprop=\"url\" href=\"https://www.tatacliq.com/electronics-sale\"/><meta itemprop=\"name\" content=\"Electronics\"/><meta itemprop=\"description\" content=\"Amazing Deals on Large & Small Electronic Appliances.\"/></span><span itemscope=\"itemscope\" itemtype=\"https://www.schema.org/SiteNavigationElement\"><link itemprop=\"url\" href=\"https://www.tatacliq.com/womens-clothing/c-msh10\"/><meta itemprop=\"name\" content=\"Women's Fashion\"/><meta itemprop=\"description\" content=\"Huge Discounts on Women's Fashion Clothing & Apparels.\"/></span><span itemscope=\"itemscope\" itemtype=\"https://www.schema.org/SiteNavigationElement\"><link itemprop=\"url\" href=\"https://www.tatacliq.com/mens-clothing/c-msh11\"/><meta itemprop=\"name\" content=\"Men's Fashion\"/><meta itemprop=\"description\" content=\"Largest Online Collection of Branded Clothing for Men.\"/></span><span itemscope=\"itemscope\" itemtype=\"https://www.schema.org/SiteNavigationElement\"><link itemprop=\"url\" href=\"https://www.tatacliq.com/deal-of-the-day\"/><meta itemprop=\"name\" content=\"Deal of the Day\"/><meta itemprop=\"description\" content=\"Check out the Top Deals & Discounts of the Day at Tata CLiQ!\"/></span><span itemscope=\"itemscope\" itemtype=\"https://www.schema.org/SiteNavigationElement\"><link itemprop=\"url\" href=\"https://www.tatacliq.com/electronics-mobile-phones-smartphones/c-msh1210100\"/><meta itemprop=\"name\" content=\"Smartphones\"/><meta itemprop=\"description\" content=\" Upto 60% Off on Latest Smartphone Brands.\"/></span><span itemscope=\"itemscope\" itemtype=\"https://www.schema.org/SiteNavigationElement\"><link itemprop=\"url\" href=\"https://www.tatacliq.com/westside/c-mbh11a00004?&icid2=hbr:regu:wlp:m10:a00004:best:01:230418\"/><meta itemprop=\"name\" content=\"Westside\"/><meta itemprop=\"description\" content=\"Latest Collection of Westside Clothing for Men & Women.\"/></span><script type=\"text/javascript\"  src=\"/yu8xE/we/L/2/agk2be2jvHE/YOwaNpXL1Q/bgcJeAMB/E1RLM1c/UWzo\"></script></body></html>\n"
     ]
    }
   ],
   "source": []
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
