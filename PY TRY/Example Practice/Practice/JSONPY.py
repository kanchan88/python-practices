book = {}

book['richdad'] = {
    "name":"Rich Dad Poor Dad",
    "writer":"Robert Kiyosaki",
    "publsihed":1997,
    "price": 300
}

book['themonk'] = {
    "name":"The Monk Who Sold His ferrari",
    "writer": "Robin Sharma",
    "publsihed": 2005,
    "price":450
}

book['selllike'] = {
    "name":"Sell Like Crazy",
    "writer" : "Sabri Suby",
    "publsihed": 2019,
    "price": 400
}

print("the type of Book", type(book))
import json
s = json.dumps(book)
print(s)
print("the type of JSON", type(s))

with open("/home/evazs/Documents/Intern/PY Learning/Practice/json.txt", "w") as f:
    f.write(s)
