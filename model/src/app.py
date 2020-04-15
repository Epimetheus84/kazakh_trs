import os

from flask import Flask
from model.src.main import Model

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Service available'

@app.route('/infer')
def hello():
    return 'Service available'

if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('FLASK_RUN_PORT', 4444)))
