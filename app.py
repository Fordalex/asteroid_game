import os
from os import path
if path.exists("env.py"):
    import env
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo, pymongo

DBURL = os.environ.get('DATABASE_URL')

app = Flask(__name__)
app.config["MONGO_URI"] = DBURL
mongo = PyMongo(app)

# View the home page.
from home import *
# Save the high scores for each game.
from high_scores import *
# Mastermind game and instructions page.
from mastermind import *
# Ufo defence game
from ufo_defence import *
# mulitplater pong game
from pong import *


if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(host=os.environ.get("IP"),
        port=int(os.environ.get("PORT")), debug=True)