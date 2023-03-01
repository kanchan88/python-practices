import openpyxl as xl
import smtplib

# link to allow less secure app https://myaccount.google.com/u/1/lesssecureapps?pli=1

'''
Change these to your credentials and name
'''
your_name = "Your Koseli Celebrations"
your_email = "yourkoseli@gmail.com"
your_password = "yourkoseli247"

# If you are using something other than gmail
# then change the 'smtp.gmail.com' and 465 in the line below
server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
server.ehlo()
server.login(your_email, your_password)


# Get all the Names, Email Addreses, Subjects and Messages
wb = xl.load_workbook(r'un_email.xlsx')

sheet1 = wb['Sheet1']

names = []
all_emails = []
for cell in sheet1['Bs']:
    names.append(cell.value)

for cell in sheet1['A']:
    all_emails.append(cell.value)

# Loop through the emails
for idx in range(len(all_emails)):

    # Get each records name, email, subject and message
    name = names[idx]
    email = all_emails[idx]
    subject = "Celebrate Immense Bond of Broter and Sister - Your Koseli"
    message = ('''
Hello Your Koseli Family!

Hope you are doing great! What's your plan for this Raksha Bandan? Thank you so much for always choosing Your Koseli in your celebrations.
We now have wide range of Cakes, Gifts, Flowers and more for your brother and sister in Nepal.

You can always browse www.yourkoseli.com and place your order.

We are taking limited orders for this Raksha Bandhan.

With Love,
Your Koseli Celebrations
''')

    # Create the email to send
    full_email = ("From: {0} <{1}>\n"
                  "To: {2} <{3}>\n"
                  "Subject: {4}\n\n"
                  "{5}"
                  .format(your_name, your_email, name, email, subject, message))

    # In the email field, you can add multiple other emails if you want
    # all of them to receive the same text
    try:
        server.sendmail(your_email, [email], full_email)
        print('Email to {} successfully sent!\n\n'.format(email))
    except Exception as e:
        print('Email to {} could not be sent :( because {}\n\n'.format(email, str(e)))

# Close the smtp server
server.close()