from instabot import Bot

postBot = Bot()

postBot.login(username="marketinginnepal", password="insta@MIN2020")

postBot.upload_photo("post.jpg", caption="this is automated post")
