document.addEventListener("DOMContentLoaded", function(){
    const rockBtn = document.getElementById("rockBtn");
    const paperBtn = document.getElementById("paperBtn");
    const scissorsBtn = document.getElementById("scissorsBtn");

    const resetBtn = document.getElementById("resetBtn");

    let loseScore = 0;
    let tieScore = 0;
    let winScore = 0;

    const loseScoreElt = document.getElementById("lose");
    const tieScoreElt = document.getElementById("draw");
    const winScoreElt = document.getElementById("win");

    const plays = {
        ROCK: "Rock",
        PAPER: "Paper",
        SCISSORS: "Scissors"
    };

    const matches = {
        LOSE: "lose",
        TIE: "tie",
        WIN: "win"
    };

    const beats = {
        [plays.ROCK]: plays.SCISSORS,
        [plays.PAPER]: plays.ROCK,
        [plays.SCISSORS]: plays.PAPER
    };

    rockBtn.addEventListener("click", function(){
        showResult(plays.ROCK ,robotNoCheat(plays.ROCK));
    });

    paperBtn.addEventListener("click", function(){
        showResult(plays.PAPER ,robotNoCheat(plays.PAPER));
    });

    scissorsBtn.addEventListener("click", function(){
        showResult(plays.SCISSORS ,robotNoCheat(plays.SCISSORS));
    });

    resetBtn.addEventListener("click", function(){
        resetScore();
    });

    function robotCheat(play){
        let finalValue = plays.PAPER;

        if(play == plays.PAPER){ finalValue = plays.SCISSORS; }
        else if(play == plays.SCISSORS){ finalValue = plays.ROCK; }

        return finalValue;
    }

    function robotNoCheat(){
        const randomIdx = Math.floor(Math.random() * 3);
        const playsList = Object.values(plays);
        const randomPlay = playsList[randomIdx];

        console.log(randomPlay);
        return randomPlay;
    }

    function showResult(play, robotPlay) {
        if (play === robotPlay) { updateScore(matches.TIE); } 
        else if (beats[play] === robotPlay) { updateScore(matches.WIN); } 
        else { updateScore(matches.LOSE); }

        const robotElt = document.getElementById("resultRobot");
        robotElt.textContent = robotPlay;
    }

    function resetScore(){
        loseScore = 0;
        tieScore = 0;
        winScore = 0;

        updateScore();
    }

    function updateScore(match){
        if(match == matches.LOSE){ loseScore++; }
        else if(match == matches.TIE){ tieScore++; }
        else if(match == matches.WIN){ winScore++; }

        loseScoreElt.textContent = loseScore + " loss";
        tieScoreElt.textContent = tieScore + " tie";
        winScoreElt.textContent = winScore + " win";
    }
});