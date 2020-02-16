from flask import Flask
from rest.cabinet import cabinet
from rest.images import images
from rest.users import users

app = Flask(__name__)
app.config['APPLICATION_ROOT'] = '/rest/v1/'


app.register_blueprint(cabinet)
app.register_blueprint(users)
app.register_blueprint(images)


@app.route('/')
def hello():
    return 'Service available'


if __name__ == '__main__':
    app.run(port=40041)
