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

@app.route('/save_high_score/<name>/<score>/<difficulty>', methods=['POST'])
def save_high_score(name, score, difficulty):
    print('data saved')
   
    asteroid = mongo.db.asteroid
    
    high_score = {
        'name': name,
        'score': score,
        'difficulty': difficulty,
    }
    asteroid.insert_one(high_score)
    return redirect(url_for('asteroid'))

@app.route('/asteroid')
def asteroid():

    return render_template('asteroid.html', high_score=mongo.db.asteroid.find())

if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(host=os.environ.get("IP"),
        port=int(os.environ.get("PORT")), debug=True)