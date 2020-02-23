import os

from flask import Flask
from rest.cabinet import cabinet
from rest.images import images
from rest.users import users

app = Flask(__name__)

app.register_blueprint(cabinet, url_prefix='/cabinet')
app.register_blueprint(users, url_prefix='/users')
app.register_blueprint(images, url_prefix='/images')


@app.route('/')
def hello():
    return 'Service available'


if __name__ == '__main__':
    app.run(host=os.getenv('IP', '127.0.0.1'), port=int(os.getenv('PORT', 4444)))
