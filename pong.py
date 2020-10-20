import os
from os import path
if path.exists("env.py"):
    import env
from flask import Flask, render_template, redirect, url_for, request
from flask_pymongo import PyMongo, pymongo
from flask_socketio import SocketIO, join_room
from app import app


mongo = PyMongo(app)
socketio = SocketIO(app)

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
    room = request.args.get('room')
    return render_template('pong/pong.html', playersName=playersName, room=room)

@socketio.on('join_room')
def handle_join_room_event(data):
    """
    Using sockets the room id will be passed into join_room to create a new room.
    """
    join_room(data['room'])
    socketio.emit('join_room_announcement', data)


@socketio.on('playerOne_position')
def handle_playerOne_position(data):
    """
    Update player one's position.
    """
    socketio.emit('playerOne_position_received', data)
