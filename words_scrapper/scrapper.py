import requests
from json import dump, loads, JSONEncoder, JSONDecoder
import csv
import re

# import urllib.request
# from bs4 import BeautifulSoup

url = 'https://kaz.nur.kz/latest/?page='
page = 1
all_words = set()
csvfile = 'data.csv'

while True:
    response = requests.get(url + str(page))
    if response.status_code == 404:
        print('404')
        break
    text = response.text
    text = re.sub('[^А-Яа-яұқүөһәіңғёҰҚҮӨҺӘІҢҒЁ\s]', '', text)
    text = re.sub('\s{2,}', ' ', text)
    words = text.split(' ')
    words = set(words)
    words.remove('')
    for word in words:
        all_words.add(word.lower())

    page = page + 1


with open(csvfile, "w") as output:
    writer = csv.writer(output, lineterminator='\n')
    for val in all_words:
        writer.writerow([val])
