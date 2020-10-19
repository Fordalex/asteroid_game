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

@app.route('/pong_lobby')
def pong_lobby():
    """
    The lobby to join with a waiting player or a friend with a chosen room id.
    """
    return render_template('pong/lobby.html')