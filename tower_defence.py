import os
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo, pymongo
from app import app

mongo = PyMongo(app)

# Ufo defence
@app.route('/tower_defence')
def santa_catch():
    return render_template('tower_defence/tower_defence.html')