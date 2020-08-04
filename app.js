/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, sixScore, finalScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        document.getElementById('final-score').disabled = true;
        
         // 1. Random number
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);
    
        // 2. Display the result
        var diceDOM1 = document.getElementById('dice-1');
        var diceDOM2 = document.getElementById('dice-2');
    
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
    
        document.querySelector('#current-' + activePlayer).textContent = dice1 + dice2;
    
        // 3. Update the round score If the rolled number was NOT a 1
        if ((dice1 !== 1) && (dice2 !== 1)) {
            if (dice1 === 6) {
                sixScore += 1;
            }
            if (dice2 === 6) {
                sixScore += 1;
            }
            if (sixScore === 2) {
                scores[activePlayer] = 0;
    
                document.getElementById('score-' + activePlayer).textContent = 0;
                
                nextPlayer();
            } else {
                roundScore += dice1 + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
    
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
        if (scores[activePlayer] >= finalScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    var diceDOM1 = document.getElementById('dice-1');
    var diceDOM2 = document.getElementById('dice-2');
    
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    roundScore = 0;
    sixScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    diceDOM1.style.display = 'none';
    diceDOM2.style.display = 'none';
}

document.getElementById('final-score').addEventListener('input', function () {
    finalScore = document.getElementById('final-score').value;
    
    // Undefined, 0, null or "" are COERCED to false
    // Anything else is COERCED to true
    if ((finalScore) && (finalScore > 0)) {
        document.querySelector('.btn-roll').disabled = false;
        document.querySelector('.btn-hold').disabled = false;
    }
});

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    sixScore = 0;
    
    document.querySelector('.btn-roll').disabled = true;
    document.querySelector('.btn-hold').disabled = true;
    document.getElementById('final-score').disabled = false;
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('name-0').classList.remove('Winner');
    document.getElementById('name-1').classList.remove('Winner');
    document.getElementById('name-0').classList.remove('active');
    document.getElementById('name-1').classList.remove('active');
    document.getElementById('name-0').classList.add('active');
}




