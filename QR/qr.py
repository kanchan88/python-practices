import qrcode

img = qrcode.make({
'accountNumber':'0570050059845',
'accountName':'Kanchan Bhatta',
'bankCode':'MBNLNPKA',
'accountType': '',
'amount':'4500'
})

img.save("qr.png")
