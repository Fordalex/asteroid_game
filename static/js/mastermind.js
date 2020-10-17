$(document).ready(function () {
    $('#enterNameModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    playerName = localStorage.getItem('playerName');
    if (playerName == null) {
        playerName = 'Player';
    }
    $('#inputPlayerName').attr('value',playerName);
    loop();
    $('.expand-container').hide();
    $('#player-coins').html(0);
});

/* drop down */

$('.expand-button').on('click', function () {
    $(this).next('div').slideToggle('slow');
    if ($(this).children('i').css('transform') == "none") {
        $(this).children('i').css('transform', "rotateZ(180deg)");
    } else {
        $(this).children('i').css('transform', "none");
    }
});

/* entry modal */

$('.difficuly-select-entry').on('click', function () {
    $('#close-start-modal').html(`<Button type="submit" class="btn btn-success" onclick="addName()" data-dismiss="modal">Okay</Button>`);
    $('#enter-name-message').html('<p class="text-success">Thank you, Enjoy!</p>');
});

/* players name */

var playerName;

function addName() {
    playerName = $('#inputPlayerName').val();
    $('#player-name-stats').text(playerName + "'s");
    if (playerName == 'cheat') {
        for (let i = 0; i < 8000; i++) {
            coins++;
        }
    }
    $('#player-coins').html(coins);
    localStorage.setItem('playerName', playerName);
}

/* variables */

var round = 1;
var holeSelect = 1;
var gameStarted = false;
var fullGames = 0;
var coins = 0;
var soundOn = true;

var playerLocationOne = 0;
var playerLocationTwo = 0;
var playerLocationThree = 0;
var playerLocationFour = 0;

var masterLocationOne = 0;
var masterLocationTwo = 0;
var masterLocationThree = 0;
var masterLocationFour = 0;

var winnerBoolean = false;

/* sound on/off */

$('#sound-on-off').on('click', function () {
    if (soundOn == true) {
        soundOn = false;
        $('#sound-on-off').children('i').remove();
        $('#sound-on-off').append('<i class="fas fa-volume-mute mr-3"></i>');
    } else {
        soundOn = true;
        $('#sound-on-off').children('i').remove();
        $('#sound-on-off').append('<i class="fas fa-volume-up mr-3"></i>');
    }
});

/* difficulty setting */

$('.easy-difficulty').on('click', function () {
    $('.not-in-use').remove();
    difficultySetting = 'easy';
    difficultyStats = 'E';
    difficultyGenerate = 3;
    $('.easy-counter-selector-container').append('<i class="fas fa-ban not-in-use"></i>');
    $('.medium-counter-selector-container').append('<i class="fas fa-ban not-in-use"></i>');
});
$('.medium-difficulty').on('click', function () {
    $('.not-in-use').remove();
    difficultySetting = 'medium';
    difficultyStats = 'M';
    difficultyGenerate = 5;
    $('.medium-counter-selector-container').append('<i class="fas fa-ban not-in-use"></i>');
});
$('.hard-difficulty').on('click', function () {
    $('.not-in-use').remove();
    difficultySetting = 'hard';
    difficultyStats = 'H';
    difficultyGenerate = 7;
});

var difficultySetting = '';
var difficultyStats = '';
var difficultyGenerate;

/* audio */

var startSound = new Audio();
startSound.src = "assets/audio/classic--game-start.wav";

var counterDown = new Audio();
counterDown.src = "assets/audio/classic--counter-down.wav";
var counterDownTwo = new Audio();
counterDownTwo.src = "assets/audio/classic--counter-down2.wav";
var counterDownThree = new Audio();
counterDownThree.src = "assets/audio/classic--counter-down3.wav";

var removeCounterSound = new Audio();
removeCounterSound.src = "assets/audio/classic--remove.wav";

var gameWon = new Audio();
gameWon.src = "assets/audio/classic--game-won.wav";

var gameOverSound = new Audio();
gameOverSound.src = "assets/audio/classic--game-lose.wav";

var lineCheckedSound = new Audio();
lineCheckedSound.src = "assets/audio/classic--line-checked.wav";

/* counter container selected drop down*/


$('body').on('click', '.counters-unlocked', function () {
    $('.counters-unlocked').removeClass('inventory-selected');
    $(this).addClass('inventory-selected');
});

$('body').on('click', '.themes-unlocked', function () {
    $('.themes-unlocked').removeClass('inventory-selected');
    $(this).addClass('inventory-selected');
});


/* buying counters */

var redCounter = '<img src="assets/images/red-counter.png" alt="red-counter" class="counter">';
var greenCounter = '<img src="assets/images/green-counter.png" alt="green-counter" class="counter">';
var yellowCounter = '<img src="assets/images/yellow-counter.png" alt="yellow-counter" class="counter">';
var blueCounter = '<img src="assets/images/blue-counter.png" alt="blue-counter" class="counter">';
var orangeCounter = '<img src="assets/images/orange-counter.png" alt="orange-counter" class="counter">';
var whiteCounter = '<img src="assets/images/white-counter.png" alt="white-counter" class="counter">';
var holeCounter = '';

var fruitCounterPurchased = false;
var candyCounterPurchased = false;
var gemCounterPurchased = false;

$('#fruit-counters-purchase').on('click', function () {
    if (coins >= 200 && fruitCounterPurchased == false) {
        fruitCounterPurchased = true;
        $('#fruit-counter-inventory-select').children().remove();
        $('#fruit-counter-inventory-select').append('<div><img src="assets/images/yellow-fruit-counter.png" alt="yellow-counter" class="counter-inventory"></div>');
        $('#fruit-counter-inventory-select').addClass('counters-unlocked');
        $('#fruit-counters-purchase').children('p').remove();
        $('#fruit-counters-purchase').append('<p class="text-success"><b>Purchased</b></p><i class="fas fa-check text-success"></i>');
        for (let i = 0; i < 200; i++) {
            coins--;
        }
        $('#player-coins').html(coins);
        $('#select-fruit-theme').addClass('theme-unlocked');
    }
});

$('#candy-counters-purchase').on('click', function () {
    if (coins >= 350 && candyCounterPurchased == false) {
        candyCounterPurchased = true;
        $('#candy-counter-inventory-select').children().remove();
        $('#candy-counter-inventory-select').append('<div><img src="assets/images/red-candy-counter.png" alt="red-counter" class="counter-inventory"></div>');
        $('#candy-counter-inventory-select').addClass('counters-unlocked');
        $('#candy-counters-purchase').children('p').remove();
        $('#candy-counters-purchase').append('<p class="text-success"><b>Purchased</b></p><i class="fas fa-check text-success"></i>');
        for (let i = 0; i < 350; i++) {
            coins--;
        }
        $('#player-coins').html(coins);
    }
});

$('#gem-counters-purchase').on('click', function () {
    if (coins >= 500 && gemCounterPurchased == false) {
        gemCounterPurchased = true;
        $('#gem-counter-inventory-select').children().remove();
        $('#gem-counter-inventory-select').append('<div><img src="assets/images/blue-gem-counter.png" class="counter-inventory"></div>');
        $('#gem-counter-inventory-select').addClass('counters-unlocked');
        $('#gem-counters-purchase').children('p').remove();
        $('#gem-counters-purchase').append('<p class="text-success"><b>Purchased</b></p><i class="fas fa-check text-success"></i>');
        for (let i = 0; i < 500; i++) {
            coins--;
        }
        $('#player-coins').html(coins);
    }
});

/* selecting counters */

$('#basic-counter-inventory-select').on('click', function () {
    if (gameStarted == false) {
        redCounter = '<div class="basic-red-counter basic-counter red-glow"></div>';
        greenCounter = '<div class="basic-green-counter basic-counter green-glow"></div>';
        yellowCounter = '<div class="basic-yellow-counter basic-counter yellow-glow"></div>';
        blueCounter = '<div class="basic-blue-counter basic-counter blue-glow"></div>';
        orangeCounter = '<div class="basic-orange-counter basic-counter orange-glow"></div>';
        whiteCounter = '<div class="basic-white-counter basic-counter white-glow"></div>';
    }
});

$('#classic-counter-inventory-select').on('click', function () {
    if (gameStarted == false) {
        redCounter = '<img src="assets/images/red-counter.png" alt="red-counter" class="counter">';
        greenCounter = '<img src="assets/images/green-counter.png" alt="green-counter" class="counter">';
        yellowCounter = '<img src="assets/images/yellow-counter.png" alt="yellow-counter" class="counter">';
        blueCounter = '<img src="assets/images/blue-counter.png" alt="blue-counter" class="counter">';
        orangeCounter = '<img src="assets/images/orange-counter.png" alt="orange-counter" class="counter">';
        whiteCounter = '<img src="assets/images/white-counter.png" alt="white-counter" class="counter">';
    }
});

$('#fruit-counter-inventory-select').on('click', function () {
    if (gameStarted == false && fruitCounterPurchased == true) {
        redCounter = '<img src="assets/images/red-fruit-counter.png" alt="red-counter" class="counter-noshadow">';
        greenCounter = '<img src="assets/images/green-fruit-counter.png" alt="green-counter" class="counter-noshadow">';
        yellowCounter = '<img src="assets/images/yellow-fruit-counter.png" alt="yellow-counter" class="counter-noshadow">';
        blueCounter = '<img src="assets/images/blue-fruit-counter.png" alt="blue-counter" class="counter-noshadow">';
        orangeCounter = '<img src="assets/images/orange-fruit-counter.png" alt="orange-counter" class="counter-noshadow">';
        whiteCounter = '<img src="assets/images/white-fruit-counter.png" alt="white-counter" class="counter-noshadow">';
    }
});

$('#candy-counter-inventory-select').on('click', function () {
    if (gameStarted == false && candyCounterPurchased == true) {
        redCounter = '<img src="assets/images/red-candy-counter.png" alt="red-counter" class="counter">';
        greenCounter = '<img src="assets/images/green-candy-counter.png" alt="green-counter" class="counter">';
        yellowCounter = '<img src="assets/images/yellow-candy-counter.png" alt="yellow-counter" class="counter">';
        blueCounter = '<img src="assets/images/blue-candy-counter.png" alt="blue-counter" class="counter">';
        orangeCounter = '<img src="assets/images/orange-candy-counter.png" alt="orange-counter" class="counter">';
        whiteCounter = '<img src="assets/images/white-candy-counter.png" alt="white-counter" class="counter">';
    }
});

$('#gem-counter-inventory-select').on('click', function () {
    if (gameStarted == false && gemCounterPurchased == true) {
        redCounter = '<img src="assets/images/red-gem-counter.png" alt="red-counter" class="counter-noshadow">';
        greenCounter = '<img src="assets/images/green-gem-counter.png" alt="green-counter" class="counter-noshadow">';
        yellowCounter = '<img src="assets/images/yellow-gem-counter.png" alt="yellow-counter" class="counter-noshadow">';
        blueCounter = '<img src="assets/images/blue-gem-counter.png" alt="blue-counter" class="counter-noshadow">';
        orangeCounter = '<img src="assets/images/orange-gem-counter.png" alt="orange-counter" class="counter-noshadow">';
        whiteCounter = '<img src="assets/images/white-gem-counter.png" alt="white-counter" class="counter-noshadow">';
    }
});

/* buying themes */

var fruitBackgroundPurchased = false;
var pinkBackgroundPurchased = false;
var iceBackgroundPurchased = false;

function buyTheme(themeName) {
    let themes = {
        'fruit': {
            'cost': 100,
            'background': 'fruit-background',
            'inventoryBackgroundTheme': 'inventory-background-fruit-theme',
            'themeStyle': 'fruit-theme',
            'themePurchased': fruitBackgroundPurchased,
            'themeInventory': '#select-fruit-theme',
            'inventoryBackgroundImage': 'fruit-background-container',
            'storeItemContainer': '#fruit-background-purchase',
            'playButton': 'play-button-fruit'
        },
        'pink': {
            'cost': 200,
            'background': 'pink-background',
            'inventoryBackgroundTheme': 'inventory-background-pink-theme',
            'themeStyle': 'pink-theme',
            'themePurchased': pinkBackgroundPurchased,
            'themeInventory': '#select-pink-theme',
            'inventoryBackgroundImage': 'pink-background-container',
            'storeItemContainer': '#pink-background-purchase',
            'playButton': 'play-button-pink'
        },
        'ice': {
            'cost': 300,
            'background': 'ice-background',
            'inventoryBackgroundTheme': 'inventory-background-ice-theme',
            'themeStyle': 'ice-theme',
            'themePurchased': iceBackgroundPurchased,
            'themeInventory': '#select-ice-theme',
            'inventoryBackgroundImage': 'ice-background-container',
            'storeItemContainer': '#ice-background-purchase',
            'playButton': 'play-button-ice'
        },
    };
    let theme = themes[themeName];

    if (coins >= theme.cost && theme.themePurchased == false) {
        $('body').removeClass('ice-background');
        $('body').removeClass('pink-background');
        $('body').removeClass('fruit-background');
        $('body').addClass(theme.background);
        $('.theme').removeClass('ice-theme');
        $('.theme').removeClass('pink-theme');
        $('.theme').removeClass('fruit-theme');
        $('.theme').addClass(theme.themeStyle);
        $('.inventory-sections').removeClass('inventory-background-classic-theme');
        $('.inventory-sections').removeClass('inventory-background-pink-theme');
        $('.inventory-sections').removeClass('inventory-background-ice-theme');
        $('.inventory-sections').removeClass('inventory-background-fruit-theme');
        $('.inventory-sections').addClass(theme.inventoryBackgroundTheme);
        $('#player-name-stats').removeClass('pink-theme');
        $('#player-name-stats').removeClass('ice-theme');
        $('#player-name-stats').removeClass('fruit-theme');
        $('#player-name-stats').removeClass('colour-secondary');
        $('#player-name-stats').addClass(theme.themeStyle);
        $('#ready-button').removeClass('play-button-classic');
        $('#ready-button').removeClass('play-button-fruit');
        $('#ready-button').removeClass('play-button-ice');
        $('#ready-button').removeClass('play-button-pink');
        $('#ready-button').addClass(theme.playButton);
        currentTheme = theme.themeStyle;
        currentThemePlayButton = theme.playButton;
        for (let i = 0; i < theme.cost; i++) {
            coins--;
        }
        $('#player-coins').html(coins);
        $(theme.themeInventory).children().remove();
        $(theme.themeInventory).addClass(theme.inventoryBackgroundImage);
        $(theme.themeInventory).addClass('themes-unlocked');
        $(theme.storeItemContainer).children('p').remove();
        $(theme.storeItemContainer).append('<p class="text-success"><b>Purchased</b></p><i class="fas fa-check text-success"></i>');
    }
}

$('#fruit-background-purchase').on('click', function () {
    if (coins >= 100) {
        buyTheme('fruit');
        fruitBackgroundPurchased = true;
    }
});

$('#pink-background-purchase').on('click', function () {
    if (coins >= 200) {
        buyTheme('pink');
        pinkBackgroundPurchased = true;
    }
});

$('#ice-background-purchase').on('click', function () {
    if (coins >= 300) {
        buyTheme('ice');
        iceBackgroundPurchased = true;
    }
});

/* selecting theme */

var currentTheme = 'classic-theme';
var currentThemePlayButton = 'play-button-classic';

function changeTheme(themeName) {
    let themes = {
        'classic': {
            'background': 'classic-background',
            'inventoryBackground': 'inventory-background-classic-theme',
            'themeStyle': 'classic-theme',
            'playButton': 'play-button-classic'
        },
        'fruit': {
            'background': 'fruit-background',
            'inventoryBackground': 'inventory-background-fruit-theme',
            'themeStyle': 'fruit-theme',
            'playButton': 'play-button-fruit'
        },
        'pink': {
            'background': 'pink-background',
            'inventoryBackground': 'inventory-background-pink-theme',
            'themeStyle': 'pink-theme',
            'playButton': 'play-button-pink'
        },
        'ice': {
            'background': 'ice-background',
            'inventoryBackground': 'inventory-background-ice-theme',
            'themeStyle': 'ice-theme',
            'playButton': 'play-button-ice'
        },
    };
    let theme = themes[themeName];
    $('body').removeClass('ice-background');
    $('body').removeClass('pink-background');
    $('body').removeClass('fruit-background');
    $('body').addClass(theme.background);
    $('.theme').removeClass('ice-theme');
    $('.theme').removeClass('pink-theme');
    $('.theme').removeClass('fruit-theme');
    $('.theme').addClass(theme.themeStyle);
    $('.inventory-sections').removeClass('inventory-background-classic-theme');
    $('.inventory-sections').removeClass('inventory-background-pink-theme');
    $('.inventory-sections').removeClass('inventory-background-ice-theme');
    $('.inventory-sections').removeClass('inventory-background-fruit-theme');
    $('.inventory-sections').addClass(theme.inventoryBackground);
    $('#player-name-stats').removeClass('pink-theme');
    $('#player-name-stats').removeClass('ice-theme');
    $('#player-name-stats').removeClass('fruit-theme');
    $('#player-name-stats').removeClass('colour-secondary');
    $('#player-name-stats').addClass(theme.themeStyle);
    $('#ready-button').removeClass('play-button-classic');
    $('#ready-button').removeClass('play-button-fruit');
    $('#ready-button').removeClass('play-button-ice');
    $('#ready-button').removeClass('play-button-pink');
    $('#ready-button').addClass(theme.playButton);
    currentTheme = theme.themeStyle;
    currentThemePlayButton = theme.playButton;
}

$('#select-classic-theme').on('click', function () {
    changeTheme('classic');
});

$('#select-fruit-theme').on('click', function () {
    if (fruitBackgroundPurchased == true) {
        changeTheme('fruit');
    }
});

$('#select-pink-theme').on('click', function () {
    if (pinkBackgroundPurchased == true) {
        changeTheme('pink');
    }
});

$('#select-ice-theme').on('click', function () {
    if (iceBackgroundPurchased == true) {
        changeTheme('ice');
    }
});

/* to start the game */

function start() {
    timerSec = 0;
    timerMin = 0;
    $('#timer-min').html(timerMin);
    $('#timer-sec').html(timerSec);
    fullGames++;
    $('.counter').remove();
    $('.marker-peg').remove();
    round = 1;
    holeSelect = 1;
    selectedHole();
    if (soundOn == true) {
        startSound.play();
    }
    $('#master-cover').removeClass('d-none');
    $('#master-cover').addClass('fade-in');
    $('#ready-button').remove();
    $('.left-play-arrow').remove();
    $('.right-play-arrow').remove();
    $('#round-counter').html(round);
    setTimeout(function () {
        generateCounters(difficultyGenerate);
        gameStarted = true;
        timer = true;
        timerFunction();
        winnerBoolean = false;
    }, 1500);
}

/* generated counters animation before the game starts */

function loop() {
    if (gameStarted == false) {
        setTimeout(function () {
            if (gameStarted == false) {
                loop();
                generateCounters(difficultyGenerate);
            }
        }, 250);
    }
}

/* computer generated counters */

function generateCounters(difficulty) {
    masterLocationOne = Math.floor(Math.random() * difficulty);
    masterLocationTwo = Math.floor(Math.random() * difficulty);
    masterLocationThree = Math.floor(Math.random() * difficulty);
    masterLocationFour = Math.floor(Math.random() * difficulty);

    if (masterLocationOne == 0) {
        $('#master-one').html(redCounter);
    } else if (masterLocationOne == 1) {
        $('#master-one').html(greenCounter);
    } else if (masterLocationOne == 2) {
        $('#master-one').html(yellowCounter);
    } else if (masterLocationOne == 3) {
        $('#master-one').html(blueCounter);
    } else if (masterLocationOne == 4) {
        $('#master-one').html(orangeCounter);
    } else if (masterLocationOne == 5) {
        $('#master-one').html(whiteCounter);
    } else {
        $('#master-one').html('');
    }

    if (masterLocationTwo == 0) {
        $('#master-two').html(redCounter);
    } else if (masterLocationTwo == 1) {
        $('#master-two').html(greenCounter);
    } else if (masterLocationTwo == 2) {
        $('#master-two').html(yellowCounter);
    } else if (masterLocationTwo == 3) {
        $('#master-two').html(blueCounter);
    } else if (masterLocationTwo == 4) {
        $('#master-two').html(orangeCounter);
    } else if (masterLocationTwo == 5) {
        $('#master-two').html(whiteCounter);
    } else {
        $('#master-two').html('');
    }

    if (masterLocationThree == 0) {
        $('#master-three').html(redCounter);
    } else if (masterLocationThree == 1) {
        $('#master-three').html(greenCounter);
    } else if (masterLocationThree == 2) {
        $('#master-three').html(yellowCounter);
    } else if (masterLocationThree == 3) {
        $('#master-three').html(blueCounter);
    } else if (masterLocationThree == 4) {
        $('#master-three').html(orangeCounter);
    } else if (masterLocationThree == 5) {
        $('#master-three').html(whiteCounter);
    } else {
        $('#master-three').html('');
    }

    if (masterLocationFour == 0) {
        $('#master-four').html(redCounter);
    } else if (masterLocationFour == 1) {
        $('#master-four').html(greenCounter);
    } else if (masterLocationFour == 2) {
        $('#master-four').html(yellowCounter);
    } else if (masterLocationFour == 3) {
        $('#master-four').html(blueCounter);
    } else if (masterLocationFour == 4) {
        $('#master-four').html(orangeCounter);
    } else if (masterLocationFour == 5) {
        $('#master-four').html(whiteCounter);
    } else {
        $('#master-four').html('');
    }
}

function chooseColour(chosenColour, colourNum) {
    if (gameStarted == true) {
        var countHoleSelector = '#r-' + round;
        counterDownSound();
        $('.hole-selector').remove();

        if (holeSelect == 1) {
            $(countHoleSelector + '-c-one').append(chosenColour);
            $(countHoleSelector + '-c-two').append('<i class="fas fa-long-arrow-alt-down hole-selector"></i>');
            holeSelect++;
            playerLocationOne = colourNum;
        } else if (holeSelect == 2) {
            $(countHoleSelector + '-c-two').html(chosenColour);
            $(countHoleSelector + '-c-three').append('<i class="fas fa-long-arrow-alt-down hole-selector"></i>');
            holeSelect++;
            playerLocationTwo = colourNum;
        } else if (holeSelect == 3) {
            $(countHoleSelector + '-c-three').html(chosenColour);
            $(countHoleSelector + '-c-four').append('<i class="fas fa-long-arrow-alt-down hole-selector"></i>');
            holeSelect++;
            playerLocationThree = colourNum;
        } else if (holeSelect == 4) {
            $(countHoleSelector + '-c-four').html(chosenColour);
            $('#check-round-arrow').append('<i class="fas fa-long-arrow-alt-right hole-selector hole-selector-check"></i>');
            holeSelect++;
            playerLocationFour = colourNum;
        }
        selectedHole();
    }
}

/* sound randomised for when the player places a counter */

function counterDownSound() {
    if (soundOn == true) {
        var pick = Math.floor(Math.random() * 3);
        if (pick == 0) {
            counterDown.play();
        } else if (pick == 1) {
            counterDownTwo.play();
        } else if (pick == 2) {
            counterDownThree.play();
        }
    }
}

/* A arrow showing the user where the next counter will go */

function selectedHole() {
    var countHoleSelector = '#r-' + round;
    $('.hole-selector').remove();
    if (holeSelect == 1) {
        $(countHoleSelector + '-c-one').append('<i class="fas fa-long-arrow-alt-down hole-selector"></i>');
    } else if (holeSelect == 2) {
        $(countHoleSelector + '-c-two').append('<i class="fas fa-long-arrow-alt-down hole-selector"></i>');
    } else if (holeSelect == 3) {
        $(countHoleSelector + '-c-three').append('<i class="fas fa-long-arrow-alt-down hole-selector"></i>');
    } else if (holeSelect == 4) {
        $(countHoleSelector + '-c-four').append('<i class="fas fa-long-arrow-alt-down hole-selector"></i>');
    } else if (holeSelect == 5) {
        $('#check-round-arrow').append('<i class="fas fa-long-arrow-alt-right hole-selector hole-selector-check"></i>');
    }
}

function removeCounter() {
    if (gameStarted == true) {
        var countHoleSelector = '#r-' + round;
        if (soundOn == true) {
            removeCounterSound.play();
        }
        if (holeSelect == 2) {
            $(countHoleSelector + '-c-one').html('');
            holeSelect--;
            selectedHole();

        } else if (holeSelect == 3) {
            $(countHoleSelector + '-c-two').html('');
            holeSelect--;
            selectedHole();

        } else if (holeSelect == 4) {
            $(countHoleSelector + '-c-three').html('');
            holeSelect--;
            selectedHole();

        } else if (holeSelect == 5) {
            $(countHoleSelector + '-c-four').html('');
            holeSelect--;
            selectedHole();

        }
    }
}

function checkCounters() {
    if (gameStarted == true && holeSelect == 5) {
        var blackPeg = '<img src="assets/images/black-peg.png" class="marker-peg">';
        var whitePeg = '<img src="assets/images/white-peg.png" class="marker-peg">';

        var countHoleSelector = '#peg-container-' + round;
        var playerLocationOneChecked = false;
        var playerLocationTwoChecked = false;
        var playerLocationThreeChecked = false;
        var playerLocationFourChecked = false;

        var masterLocationOneChecked = false;
        var masterLocationTwoChecked = false;
        var masterLocationThreeChecked = false;
        var masterLocationFourChecked = false;

        if (soundOn == true) {
            lineCheckedSound.play();
        }

        /* check to see if the colour is correct and in the right location */

        if (masterLocationOne == playerLocationOne) {
            $(countHoleSelector).append(blackPeg);
            playerLocationOneChecked = true;
            masterLocationOneChecked = true;

        }
        if (masterLocationTwo == playerLocationTwo) {
            $(countHoleSelector).append(blackPeg);
            playerLocationTwoChecked = true;
            masterLocationTwoChecked = true;

        }
        if (masterLocationThree == playerLocationThree) {
            $(countHoleSelector).append(blackPeg);
            playerLocationThreeChecked = true;
            masterLocationThreeChecked = true;

        }
        if (masterLocationFour == playerLocationFour) {
            $(countHoleSelector).append(blackPeg);
            playerLocationFourChecked = true;
            masterLocationFourChecked = true;
        }

        /* check if the correct colour in the wrong loction  */

        if (masterLocationOneChecked == false) {
            if (masterLocationOne == playerLocationTwo && playerLocationTwoChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationTwoChecked = true;
            } else if (masterLocationOne == playerLocationThree && playerLocationThreeChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationThreeChecked = true;
            } else if (masterLocationOne == playerLocationFour && playerLocationFourChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationFourChecked = true;
            }
        }

        if (masterLocationTwoChecked == false) {
            if (masterLocationTwo == playerLocationOne && playerLocationOneChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationOneChecked = true;
            } else if (masterLocationTwo == playerLocationThree && playerLocationThreeChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationThreeChecked = true;
            } else if (masterLocationTwo == playerLocationFour && playerLocationFourChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationFourChecked = true;
            }
        }

        if (masterLocationThreeChecked == false) {
            if (masterLocationThree == playerLocationOne && playerLocationOneChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationOneChecked = true;
            } else if (masterLocationThree == playerLocationTwo && playerLocationTwoChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationTwoChecked = true;
            } else if (masterLocationThree == playerLocationFour && playerLocationFourChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationFourChecked = true;
            }
        }

        if (masterLocationFourChecked == false) {
            if (masterLocationFour == playerLocationOne && playerLocationOneChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationOneChecked = true;
            } else if (masterLocationFour == playerLocationTwo && playerLocationTwoChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationTwoChecked = true;
            } else if (masterLocationFour == playerLocationThree && playerLocationThreeChecked == false) {
                $(countHoleSelector).append(whitePeg);
                playerLocationThreeChecked = true;
            }
        }

        if (masterLocationOne == playerLocationOne && masterLocationTwo == playerLocationTwo && masterLocationThree == playerLocationThree && masterLocationFour == playerLocationFour) {
            levelComplete();
            winnerBoolean = true;
        }

        if (round == 10 && winnerBoolean == false) {
            if (soundOn == true) {
                gameOverSound.play();
            }
            levelLost();
        }

        round++;
        holeSelect = 1;
        $('#round-counter').html(round);
        playerLocationOne = 0;
        playerLocationTwo = 0;
        playerLocationThree = 0;
        playerLocationFour = 0;
        selectedHole();
    }
}

function levelComplete() {
    $('#round-counter').html(1);
    $('.counter').remove();
    $('.basic-counter').remove();
    $('.counter-noshadow').remove();
    $('.marker-peg').remove();
    timer = false;
    if (difficultySetting == 'easy') {
        difficultyBonus = 50;
    } else if (difficultySetting == 'medium') {
        difficultyBonus = 100;
    } else if (difficultySetting == 'hard') {
        difficultyBonus = 150;
    }
    if (timerMin < 1) {
        timerBonus = 50;
    } else if (timerMin < 2) {
        timerBonus = 35;
    } else if (timerMin < 3) {
        timerBonus = 15;
    } else if (timerMin < 4) {
        timerBonus = 0;
    }
    var timerBonus;
    var difficultyBonus;
    var roundCoinBonus = (10 - round + 1) * 10;
    var totalRoundCoins = 50 + roundCoinBonus + difficultyBonus + timerBonus;
    /* adding stats */
    $('#stats-table').append(`
     <tr>
     <th class="theme ${currentTheme}">${fullGames}</th>
     <td>${round}</td>
     <td>${timerMin} : ${timerSec}</td>
     <td>${totalRoundCoins}</td>
     <td class="${difficultySetting}">${difficultyStats}</td>
     </tr>
     `);

    $('#attempts-round-' + fullGames).text(round);
    $('#attempts-round').html(round);
    $('#master-cover').removeClass('fade-in');
    $('#master-cover').addClass('d-none');
    $('.hole-selector').remove();
    if (soundOn == true) {
        gameWon.play();
    }
    gameStarted = false;

    /* putting play button back */

    $('#ready-start-button-container').html(`
        <i class="fas fa-long-arrow-alt-right left-play-arrow"></i>
        <button onclick="start()" id="ready-button" class="${currentThemePlayButton}">Play!<i class="mx-2 fas fa-play"></i></button>
        <i class="fas fa-long-arrow-alt-left right-play-arrow"></i>
    `);

    /* adding coins */

    for (let i = 0; i < totalRoundCoins; i++) {
        coins++;
    }

    $('#round-coin-bonus').html(roundCoinBonus);
    $('#total-coins-round').html(totalRoundCoins);
    $('#player-coins').html(coins);
    $('#difficulty-bonus').html(difficultyBonus);
    $('#timer-bonus').html(timerBonus);

    /* total stats */
    totalStatAttempts = addingTotalStats(round, totalStatAttempts);
    $('#totalStatAttempts').html(totalStatAttempts);
    totalStatCoins = addingTotalStats(totalRoundCoins, totalStatCoins);
    $('#totalStatCoins').html(totalStatCoins);

    /* winner modal */

    setTimeout(function () {
        $('.hole-selector').remove();
        $('#player-name-winner').text(playerName);
        $('#time-taken-min').html(timerMin);
        $('#time-taken-sec').html(timerSec);
        $('#winnerModal').modal({
            backdrop: 'static',
            keyboard: false
        });
        $('#timer-min').html(0);
        $('#timer-sec').html(0);
    }, 200);
}

function levelLost() {
    timer = false;
    gameStarted = false;
    $('#ready-start-button-container').html(`
        <i class="fas fa-long-arrow-alt-right left-play-arrow"></i>
        <button onclick="start()" id="ready-button" class="${currentThemePlayButton}">Play!<i class="mx-2 fas fa-play"></i></button>
        <i class="fas fa-long-arrow-alt-left right-play-arrow"></i>
    `);
    for (let i = 0; i < 50; i++) {
        coins--;
    }
    $('#player-coins').html(coins);
    $('.marker-peg').remove();
    $('#round-counter').html(1);
    $('#master-cover').addClass('d-none');
    setTimeout(function () {
        $('#player-name-loser').text(playerName);
        $('.counter').remove();
        $('.basic-counter').remove();
        $('.counter-noshadow').remove();
        $('#loserModal').modal({
            backdrop: 'static',
            keyboard: false
        });
    }, 200);
    totalStatAttempts = addingTotalStats(round, totalStatAttempts);
    $('#totalStatAttempts').html(totalStatAttempts);

}

/* Timer */

var timerSec = 0;
var timerMin = 0;
var timer = false;

function timerFunction() {
    if (timer == true) {
        setTimeout(function () {
            timerSec++;
            $('#timer-min').html(timerMin);
            $('#timer-sec').html(timerSec);
            if (timerSec == 60) {
                timerSec = 0;
                timerMin++;
            }
            timerFunction();
        }, 1000);
    }
}

/* Total stats */

var totalStatAttempts = 0;
var totalStatCoins = 0;

function addingTotalStats(numOne, numTwo) {
    return numOne + numTwo;
}