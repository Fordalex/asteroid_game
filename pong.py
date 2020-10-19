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