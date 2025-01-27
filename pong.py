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

roomUsers = {}

@app.route('/pong_lobby/<message>')
def pong_lobby(message):
    """
    The lobby to join with a waiting player or a friend with a chosen room id.
    """
    global roomUsers
    return render_template('pong/lobby.html', message=message, lobbies=roomUsers, lobbyKeys=roomUsers)

@app.route('/pong')
def pong():
    """
    Joins the player to pong game with the same game id.
    """

    playersName = request.args.get('playersName')
    room = str(request.args.get('room'))
    
    global roomUsers
    try:
        playersInRoom = roomUsers[room]
    except:
        playersInRoom = []

    if len(playersInRoom) < 2:
        playersInRoom.append(str(playersName))
    else:
        return redirect(url_for('pong_lobby', message="This lobby is full!"))

    roomDict = {
        room: playersInRoom
    }
    roomUsers.update(roomDict)

    if path.exists("env.py"):
        hosted = 'local'
    else:
        hosted = 'heroku'

    return render_template('pong/pong.html', playersName=playersName, room=room, hosted=hosted)


@socketio.on('join_room')
def handle_join_room_event(data):
    """
    Using sockets the room id will be passed into join_room to create a new room.
    """
    app.logger.info("the logger is working")
    app.logger.info(data)
    join_room(data['room'])
   
    data.update({
        'players': roomUsers[data['room']],
        })
    socketio.emit('join_room_announcement', data, room=data['room'])


@socketio.on('playerOne_position')
def handle_playerOne_position(data):
    """
    Update player one's position.
    """
    socketio.emit('playerOne_position_received', data, room=data['room'])

@socketio.on('playerTwo_position')
def handle_playerOne_position(data):
    """
    Update player two's position.
    """
    socketio.emit('playerTwo_position_received', data, room=data['room'])

@socketio.on('ball_location')
def handle_ball_location(data):
    """
    Update the ball location
    """
    socketio.emit('ball_position_received', data, room=data['room'])


@socketio.on('player_leaving')
def handle_playerOne_position(data):
    """
    remove player from roomUsers
    """
    global roomUsers
    playerLeaving = data['playersName']

    try:
        if playerLeaving == roomUsers[data['room']][0]:
            roomUsers[data['room']].pop(0)
        else:
            roomUsers[data['room']].pop(1)
    except:
        None

    data.update({
        'players': roomUsers[data['room']],
        })

    if len(roomUsers[data['room']]) == 0:
        del roomUsers[data['room']]

    socketio.emit('player_left_announcement', data, room=data['room'])
    
    

    
