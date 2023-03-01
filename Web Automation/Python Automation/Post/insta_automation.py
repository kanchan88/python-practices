from instabot import Bot
import cv2 

img = cv2.imread("post.jpg")
Caption="Let's test Automation"

def UPhoto(img, Caption):
    bot = Bot()
    bot.login(username = "marketinginnepal", password="insta@MIN2020")

    try:
        if bot.upload_photo(img, caption=Caption):
            return True
        else:
            return False
    except:
        return False

UPhoto(img,Caption)

