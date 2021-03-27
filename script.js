score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode);
    if (e.keyCode == 38) {
        dragon = document.querySelector('.dragon');
        dragon.classList.add('animateDragon');
        setTimeout(() => {
            dragon.classList.remove('animateDragon')
        }, 700);
    }
    if (e.keyCode == 39) {
        dragon = document.querySelector('.dragon');
        dragonX = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
        dragon.style.left = (dragonX + 115) + "px";
    }
    if (e.keyCode == 37) {
        dragon = document.querySelector('.dragon');
        dragonX = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
        dragon.style.left = (dragonX - 115) + "px";
    }
}

setInterval(() => {
    dragon = document.querySelector('.dragon');
    gameover = document.querySelector('.gameover');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameover.innerHTML = "Game Over - Reload to Restart the game"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.01;
            obstacle.style.animationDuration = newDur + 's';
            console.log(newDur);
        }, 500);
        
    }
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}