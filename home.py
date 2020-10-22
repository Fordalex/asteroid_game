import os
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo, pymongo
from functions import return_highest_score_dict
from app import app

mongo = PyMongo(app)

# All game titles
@app.route('/')
def home():
    """
    Render all the game titles and show the highest score holder.
    """
    highScores = {}
    # adding ufo defence highest score
    ufo_defence = mongo.db.asteroid.find().sort('score', pymongo.DESCENDING)[0]
    highScores.update({'ufo_defence': return_highest_score_dict(ufo_defence)})
    # adding mastermind highest score
    mastermind = mongo.db.mastermind.find().sort('score', pymongo.DESCENDING)[0]
    highScores.update({'mastermind': return_highest_score_dict(mastermind)})
    # # adding pong highest score
    # pong = mongo.db.pong.find().sort('score', pymongo.DESCENDING)[0]
    # highScores.update({'pong': return_highest_score_dict(pong)})

    return render_template('home.html', highScores=highScores)
