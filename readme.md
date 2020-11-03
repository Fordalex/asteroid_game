# Fds Games

This is a library of all my game projects, please take a look and see if you can set any new high scores.

[Play Games](https://fd-games.herokuapp.com/)

- More Information on [Pong](https://github.com/Fordalex/fds_games/blob/master/readme/pong.md)
- More Information on [Mastermind](https://github.com/Fordalex/fds_games/blob/master/readme/mastermind.md)
- More Information on [Santa Catch](https://github.com/Fordalex/fds_games/blob/master/readme/santa_catch.md)
- More Information on [UFO Defence](https://github.com/Fordalex/fds_games/blob/master/readme/ufo_defence.md)

## UX

I'm trying to use loads of icons to guide the user through this web app as I'm assuming the type of user that will be using this site will be of the younger generation.

## Things to do

- Add travisCI.
- Add a star on the games I've put the most effort on.
- Break up the readme files.

## bugs

I need to use AJAX to submit the form so I can stop the user being able to change their score before submittion.

### Asteroid

bullets will shoot when the game is pause.

### Pong

- If two players enter the same lobby with the same name it gets confused. Hint: Maybe use an id.
- When a player leaves the lobby sometimes that room still shows as if its populated.
- unload and beforeunload are not working so I have no idea on how to notify the user someone has left.
- The ball speed is being updated by the frame rate this causes some problems when players are using different devices.

### Mastermind

- Add all the image urls.

## Features to implement

### Asteroid

- Add a minigun to the player when it's activated.
- Let the player purchase more powerful jets to move the player quicker.
- Add sounds to each section of the game.
- More feedback to the user after an item is purchased.


### Pong

- Allow users to change the colour of their paddle.
- Allow other users to view a game in progress.
- Lobby needs to update without having to refresh.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.



## Acknowledgements

[Inspiration for the asteroid game was taken from this tutorial](https://www.youtube.com/watch?v=eI9idPTT0c4&t=24s)
[Bike Game](https://www.youtube.com/watch?v=MW8HcwHK1S0&t=119s)
I've been watching this video and I'm taking the code step by step to get a understanding of how an object is coliding with a line. I'll then be refractoring this coding and using P5.js to create my own vision.


[Mastermind, One of my older projects.](https://github.com/Fordalex/mastermind-project)