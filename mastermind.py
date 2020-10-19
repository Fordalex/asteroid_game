import os
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo, pymongo
from app import app

mongo = PyMongo(app)

# Mastermind
@app.route('/mastermind_instructions')
def mastermind_instructions():
    """
    Display the mastermind game with high scores.
    """

    return render_template('mastermind/mastermind_instructions.html')

@app.route('/mastermind')
def mastermind():
    """
    Display the mastermind game with high scores.
    """
    high_score = mongo.db.mastermind.find().sort('score', pymongo.DESCENDING)
    return render_template('mastermind/mastermind.html', high_score=high_score)