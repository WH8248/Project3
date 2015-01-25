// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = (Math.random() + 1) *100;
    this.startX = -[Math.random() * 100 + (Math.random() * 100) + 75];
    this.startY = YenemyLocation[Math.floor(Math.random() * 4)];
    this.x = this.startX;
    this.y = this.startY;
}

//variables to correct image starting locations that are differnet than the default
var StartingX, StartingY, xOffset, yOffset;
//sound when collide
var Splat = new Audio('audio/Splat.mp3');
//the 4 possible Enemy Y cord
var YenemyLocation = [60,140,220,300];
//Popup window to select palyer
var CharSelect = prompt('What player do you want? Enter H for Hulk, I for IronMan, R for Reptil, and Z for Zuma otherise the default Player will be selected');
//assining starting possition and offset based on chosen player
if (CharSelect == "h" || CharSelect == "H") {
    CharSelect = 'images/Hulk2.png';
    StartingX = 205;
    StartingY = 440;
    xOffset = StartingX - 200;
    yOffset = 410 - StartingY;
    
} else if (CharSelect == "i" || CharSelect == "I") {
    CharSelect = 'images/Ironman.png';
    StartingX = 220;
    StartingY = 460;
    xOffset = StartingX - 200;
    yOffset = 410 - StartingY;
    
} else if (CharSelect == "z" || CharSelect == "Z") {
    CharSelect = 'images/Zuma.png';
    StartingX = 220;
    StartingY = 460;
    xOffset = StartingX - 200;
    yOffset = 410 - StartingY;

} else if (CharSelect == "r" || CharSelect == "R") {
    CharSelect = 'images/Reptil.png';
    StartingX = 220;
    StartingY = 460;
    xOffset = StartingX - 200;
    yOffset = 410 - StartingY;
    //not noted above because I don't like the player but my kids
    //really wanted it so keeping the ability to use this player
} else if (CharSelect == "a" || CharSelect == "A") {
    CharSelect = 'images/Abomination.png';
    StartingX = 220;
    StartingY = 460;
    xOffset = StartingX - 200;
    yOffset = 410 - StartingY;
} else if (CharSelect == "x" || CharSelect == "X") {
    CharSelect = 'images/Rocky.png';
    StartingX = 220;
    StartingY = 460;
    xOffset = StartingX - 200;
    yOffset = 410 - StartingY;
} else if (CharSelect == "c" || CharSelect == "R") {
    CharSelect = 'images/Chase.png';
    StartingX = 220;
    StartingY = 460;
    xOffset = StartingX - 200;
    yOffset = 410 - StartingY;
} else {
    CharSelect = 'images/char-boy.png';
    StartingX = 200;
    StartingY = 410;
    xOffset = 0;
    yOffset = 0;
    
}
//console.log(yOffset);
//console.log(CharSelect);
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 550) {
        this.x = this.startX;
    }
    this.x = this.x + this.speed * dt;
    Enemy.prototype.CollisionCheck();
}

Enemy.prototype.CollisionCheck = function () {
    for (i in allEnemies) {        
        //console.log(yOffset);
        if (player.x > (allEnemies[i].x-60) && player.x < (allEnemies[i].x + 60))   {
            if (player.y + yOffset >= (allEnemies[i].y +10) && player.y + yOffset<= (allEnemies[i].y + 55)) {
            Collision();
            }
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    //this.sprite = 'images/char-boy.png';
    this.sprite = CharSelect;  //selects player image based on selected
    this.x = StartingX;   //starting possition of selected player
    this.y = StartingY;         //starting possition of selected player
    console.log("Level 1");    // in console tlees player starting level
    //alert("Level 1");   // box to tell player level - currently disabled (anyoying when playing game)
}

Player.prototype.update = function(dt) {
    this.x * dt; 
    this.y * dt;

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(playerMove) {  // making sure player stays on board and for each palyer have offset
    if (playerMove == 'left' && this.x > (0 + xOffset) ) {
            this.x -= 100;
            //console.log(this.x);
        }
    else if (playerMove == 'right' && this.x < (400 - xOffset)) {
            this.x += 100;
            //console.log(this.x);
        }
    else if (playerMove == 'up' && this.y > 70 - yOffset) {
            this. y -= 85;    // 80
            //console.log(this.y);
        }
    else if (playerMove == 'down' && this.y <= 325 - yOffset) {
            this.y += 85;   //80
            //console.log(this.y);
        }
    else if (playerMove == 'up' && this.y <= 70 - yOffset) {
             this.x = StartingX;
             this.y = StartingY;
                var MoreEnemy = new Enemy;    //  adding enemy for each sucessful run to make it harder
                allEnemies.push(MoreEnemy);
                //alert("Level" + " " + (allEnemies.length-2));   // box to tell player new level (anoying slowed game)
                Level = "Level" + " " + (allEnemies.length-2);    // note leve in console
                console.log(Level)
        }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy;
var enemy2 = new Enemy;
var enemy3 = new Enemy;
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player;

var Collision = function () {
    player.x = StartingX;
    player.y = StartingY;
    Splat.play();           // aing Splat sound when collision
    console.log("Back to Level 1")
    while (allEnemies.length > 3){    // reseting enemys on collision
        allEnemies.pop(); 
        } 
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

