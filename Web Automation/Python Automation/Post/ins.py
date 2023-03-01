# upload post automatically

from instapy_cli import client

username='itskanchanthings'
password=''
image='posts/post.jpg'
text='This is Automated post'

with client(username, password) as cli:
    cli.upload(image,text)