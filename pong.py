import os
from os import path
if path.exists("env.py"):
    import env
from flask import Flask, render_template, redirect, url_for, request
from flask_pymongo import PyMongo, pymongo
from app import app

mongo = PyMongo(app)

@app.route('/pong_lobby')
def pong_lobby():
    """
    The lobby to join with a waiting player or a friend with a chosen room id.
    """
    return render_template('pong/lobby.html')

@app.route('/pong')
def pong():
    """
    Joins the player to pong game with the same game id.
    """
    playersName = request.args.get('playersName')
    return render_template('pong/pong.html', playersName=playersName)