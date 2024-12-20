$(function () {
    
    // initializing variables
    var squares = [], 
        SIZE = 3,
        EMPTY = "&nbsp;",
        score = {"X": 0, "O": 0},
        moves,
        turn = "X",
        playerScore = {"X": 0, "O": 0},
        tieCount = 0;
        wins = [7, 56, 448, 73, 146, 292, 273, 84],

    // initializing the start of a new game
    startNewGame = function () {
        $("#message").text("Player X's turn!");
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        squares.forEach(function (square) {
            square.html(EMPTY).css("color", "#343a40");
        });
            $("#restart-btn").hide();
    },

    // determines whether the given the score is a winning score
    win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },

    // determines if/which user wins and message accompanied
    set = function () {
        if ($(this).html() !== EMPTY) {
                return;
        }
        $(this).html(turn).css("color", turn === "X" ? "#007bff" : "#dc3545");
        moves += 1;
        score[turn] += $(this)[0].indicator;
            
        if (win(score[turn])) {
                $("#message").html("🎉 Congratulations! Player " + turn + " wins!");
            playerScore[turn] += 1;
            updateScore();
            $("#restart-btn").show();
        } else if (moves === SIZE * SIZE) {
            $("#message").html("It's a tie!");
            tieCount += 1;
            $("#tieCount").text(tieCount);
            $("#restart-btn").show();
        } else {
            turn = turn === "X" ? "O" : "X";
            $("#message").text("Player " + turn + "'s turn!");
        }
    },

    // grid creation
    play = function () {
        var board = $("<table class='table table-bordered'>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td height=75 width=75 align=center valign=center></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }

        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    };
    
    // updates the score to match the win count of each player
    function updateScore() {
        $("#scoreX").text(playerScore["X"]);
        $("#scoreO").text(playerScore["O"]);
    }

    // makes it globally accessible
    window.startNewGame = startNewGame; 
    play();
    
});
