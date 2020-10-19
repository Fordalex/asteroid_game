import os
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo, pymongo
from app import app

mongo = PyMongo(app)

# motobike game

@app.route('/motobike')
def motobike():
   
    return render_template('motobike.html')