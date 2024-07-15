const Tiles = {
    Free: "Free",
    X: "X",
    O: "O"
}

const p1 = createPlayer(1);
const p2 = createPlayer(2);

function createPlayer (number) {
    let tile;
    if (number === 1) {
        tile = Tiles.X;
    } else {
        tile = Tiles.O;
    }
    return {number, tile};
}

const model = (function() {
    const board = new Array(3);
    for (let i = 0; i < board.length; i++) {
        board[i] = [];
    }
    for(let i = 0; i< board.length; i++) {
        for (let j = 0; j<board.length; j++) {
            board[i][j] = Tiles.Free;
        }
    }
    const consoleLogBoard = function() {
        for(let i = 0; i< board.length; i++) {
            for (let j = 0; j<board.length; j++) {
                console.log(board[i][j]);
            }
        }
    }
    const isWinner = function(player) {
        //check the columns and rows
        for(let i = 0; i< board.length; i++) {
            let colCount = 0;
            let rowCount = 0;
            for (let j = 0; j<board.length; j++) {
                if (board[i][j] === player.tile) {
                    colCount++;
                }
                if (board[j][i]  === player.tile) {
                    rowCount++;
                }
                if (colCount === 3 || rowCount === 3) {
                    return true;
                }
            }
        }

        if (board[0][0] === player.tile &&
            board[1][1] === player.tile &&
            board[2][2] === player.tile
        ) {
            return true;
        }

        if (board[2][0] === player.tile &&
            board[1][1] === player.tile &&
            board[0][2] === player.tile
        ) {
            return true;
        }
        return false;
    }

    const crossTile = function(player, row, column) {
        board[row][column] = player.tile;
    }
    return {consoleLogBoard, isWinner, crossTile};

})();

const controller = (function(p1, p2, model) {
    let turn = 0;
    const drawTile = function(row, column) {
        if (turn == 0) {
            model.crossTile(p1, row, column);
            turn = 1;
        } else {
            model.crossTile(p2, row, column);
            turn = 0;
        }
    }
    return {drawTile};
})(p1, p2, model);


// view part
function setupOnClick (controller, model, p1, p2) {
    for (let i = 0; i < 9; i++) {
        const tileView = document.querySelector(`.tile${i+1}`);
        const clickHandler = (e) => {
            let row = Math.floor(i / 3);
            let col = i % 3;
            e.target.removeEventListener('click', clickHandler);
            controller.drawTile(row, col);
            // implement further here
            console.log(model.isWinner(p1));
            console.log(model.isWinner(p2));
            model.consoleLogBoard();
        }
        tileView.addEventListener("click", clickHandler);
    }
}

setupOnClick(controller, model, p1, p2);
