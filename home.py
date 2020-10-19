import os
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo, pymongo
from app import app

mongo = PyMongo(app)

# All game titles
@app.route('/')
def home():
    """
    Render all the game titles and show the highest score holder.
    """
    return render_template('home.html')
