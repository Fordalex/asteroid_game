import os
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo, pymongo
from app import app

mongo = PyMongo(app)

# Save all the high scores.
@app.route('/save_high_score/<game>/<name>/<score>/<difficulty>', methods=['POST'])
def save_high_score(game, name, score, difficulty):
    """
    Save the high scores for the each game.
    """
    if game == 'ufo_defence':
        asteroid = mongo.db.asteroid
        high_score = {
            'name': name,
            'score': int(score),
            'difficulty': difficulty,
        }
        asteroid.insert_one(high_score)
        return redirect(url_for('ufo_defence'))

    elif game == 'mastermind':
        mastermind = mongo.db.mastermind
        high_score = {
            'name': name,
            'score': int(score),
            'difficulty': difficulty,
        }
        mastermind.insert_one(high_score)
        return redirect(url_for('mastermind'))
    