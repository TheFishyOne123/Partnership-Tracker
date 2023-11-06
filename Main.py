import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://www.googleapis.com/auth/spreadsheets']
creds = ServiceAccountCredentials.from_json_keyfile_name('Credentials.json', scope)
client = gspread.authorize(creds)

#Spread Sheet Variables
sheet = client.open('Partnership Tracker')
worksheet = sheet.get_worksheet(0)
data = worksheet.get_all_records()
print(data)