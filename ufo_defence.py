import os
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo, pymongo
from app import app

mongo = PyMongo(app)

# Ufo defence
@app.route('/ufo_defence')
def ufo_defence():
    """
    The ufo defence game with the score board.
    """
    high_score = mongo.db.asteroid.find().sort('score', pymongo.DESCENDING)
    return render_template('ufo_defence/ufo_defence.html', high_score=high_score)

