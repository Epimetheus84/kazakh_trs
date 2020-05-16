import os

from flask import Flask
from rest.cabinet import cabinet
from rest.images import images
from rest.users import users
from rest.companies import companies

app = Flask(__name__)
app.url_map.strict_slashes = False


app.register_blueprint(cabinet, url_prefix='/cabinet')
app.register_blueprint(users, url_prefix='/users')
app.register_blueprint(images, url_prefix='/images')
app.register_blueprint(companies, url_prefix='/companies')


@app.route('/')
def hello():
    return 'Service available'


if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('FLASK_RUN_PORT', 4444)))
