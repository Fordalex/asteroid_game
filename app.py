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

# All game titles

@app.route('/')
def home():
    """
    Render all the game titles and show the highest score holder.
    """
    return render_template('home.html')

# Ufo defence

@app.route('/ufo_defence')
def ufo_defence():
    """
    The ufo defence game with the score board.
    """
    high_score = mongo.db.asteroid.find().sort('score', pymongo.DESCENDING)
    return render_template('ufo_defence/ufo_defence.html', high_score=high_score)

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

# motobike game

@app.route('/motobike')
def motobike():
   
    return render_template('motobike.html')

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
        return redirect(url_for('asteroid'))

    elif game == 'mastermind':
        mastermind = mongo.db.mastermind
        high_score = {
            'name': name,
            'score': int(score),
            'difficulty': difficulty,
        }
        mastermind.insert_one(high_score)
        return redirect(url_for('mastermind'))
    



if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(host=os.environ.get("IP"),
        port=int(os.environ.get("PORT")), debug=True)