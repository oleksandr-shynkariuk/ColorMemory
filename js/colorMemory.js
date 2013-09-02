var KEY = {
    'ENTER': 13,
    'LEFT':37,
    'RIGHT':39,
    'UP':38,
    'DOWN':40
};
//function to shuffle arrays
function shuffle(array){
    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};
var game = {};//a game instance
game.board = {};//game board

game.firstSelectionRow = -1;
game.firstSelectionColumn = -1;
game.secondSelectionRow = -1;
game.secondSelectionColumn = -1;
game.firstColor = "";
game.secondColor = "";
//TODO: fetch coors
game.colors = ["#3be6c4", "#e6e03b", "#6f3be6", "#4fe63b", "#e63b3b", "#ff5a00", "#ff00de", "#3b8fe6"];
game.colorsNumber = game.colors.length;

game.parentPane = 'body';//parent pane element
game.board.size = Math.sqrt(game.colorsNumber * 2);
game.board.currentCell = {};
game.board.currentRow = 0;
game.board.currentColumn = 0;
game.board.currentCellId = 'td' + game.board.currentRow + game.board.currentColumn;
game.board.style = {
    'background':'#fff',
    'opacity':1,
    'border':'20px solid #ddd'
};
game.board.highlight = {
    'border-color': 'orange'
};
game.board.grid = new Array();
game.section = {};
//fill game grid randomly with given colors
game.board.fillWithColors = function(){
    dimension = game.board.size;
    var colors = new Array();
    colors = game.colors.concat(game.colors);
    colors = shuffle(colors);
    var c = 0;
    for(var i = 0; i < dimension; ++i){
        game.board.grid[i] = new Array();
        for(var j = 0; j < dimension; ++j){
            game.board.grid[i][j] = colors[c];
            console.log("grid: " + i + " " + j + ": " + game.board.grid[i][j]);
            ++c;
        }
    }
};
game.board.updateCurrentCellId = function(){
    game.board.currentCellId = 'td' + game.board.currentRow + '' + game.board.currentColumn;
};

game.board.turnCardFaceDown = function(row, column){
    var cellId = "td" + "" + row + "" + column;
    var cell = document.getElementById(cellId);
    cell.bgColor = "white";
    $(cell).addClass("face-down");
};

game.board.updateHighlight = function(prevCellId){
    game.board.updateCurrentCellId();
    game.board.currentCell = document.getElementById(game.board.currentCellId);
    if(game.board.currentCell != null){
        game.board.currentCell.className = game.board.currentCell.className + " highlight";
    }
    prevCell = document.getElementById(prevCellId);
    if(prevCell != null){
        $(prevCell).removeClass("highlight");
    } else{
        alert("Null " + prevCellId);//TODO: remove it!
    }
};

game.moveDown = function(){
    prevCellId = game.board.currentCellId;
    game.board.currentRow = (1 + game.board.currentRow) % (game.board.size);
    game.board.updateHighlight(prevCellId);
    //TODO: Make highlight moving over already opened cells
    //TODO: prohibit moving to already opened cards
};
game.moveUp = function(){
    prevCellId = game.board.currentCellId;
    if(game.board.currentRow == 0)
        game.board.currentRow = game.board.size - 1;
    else
        --game.board.currentRow;
    game.board.updateHighlight(prevCellId);

};
game.moveLeft = function(){
    prevCellId = game.board.currentCellId;
    if(game.board.currentColumn == 0)
        game.board.currentColumn = game.board.size - 1;
    else
        --game.board.currentColumn;
    game.board.updateHighlight(prevCellId);
};
game.moveRight = function(){
    prevCellId = game.board.currentCellId;
    game.board.currentColumn = (1 + game.board.currentColumn) % (game.board.size);
    game.board.updateHighlight(prevCellId);
};
game.openCard = function(){
    var color = game.board.grid[game.board.currentRow][game.board.currentColumn];
    game.board.currentCell = document.getElementById(game.board.currentCellId);
    if(game.board.currentCell != null){
        game.board.currentCell.className = "highlight";//leave highlight and change background color
        game.board.currentCell.bgColor = color;
        if(game.firstColor == ""){//save first color
            game.firstColor = color;
            game.firstSelectionRow = game.board.currentRow;
            game.firstSelectionColumn = game.board.currentColumn;
        } else{
            if(game.firstColor != color){
                var currentRow = game.board.currentRow;
                var currentColumn = game.board.currentColumn;
                setTimeout(function(){
                    game.board.turnCardFaceDown(game.firstSelectionRow, game.firstSelectionColumn);
                    game.board.turnCardFaceDown(currentRow, currentColumn);
                }, 2000);
            }
            game.firstColor = "";
        }
    }
};

game.keyPress = function(e){
    switch(e.which){
        case KEY.DOWN:
            game.moveDown();
            break;
        case KEY.UP:
            game.moveUp();
            break;
        case KEY.LEFT:
            game.moveLeft();
            break;
        case KEY.RIGHT:
            game.moveRight();
            break;
        case KEY.ENTER:
            game.openCard();
            break;
        default: break;
    }
}

game.initStartBoard = function(){
    var gameTable = "<table>"
    for(i = 0; i < this.board.size; ++i){
        gameTable += '<tr>';
        for(j = 0; j < this.board.size; ++j){
            gameTable += "<td id=" + "td" + i + j + " class='face-down' width=" + this.section.width + " height=" + this.section.height + ">" + '</td>';
        }
        gameTable += '</tr>';
    }
    gameTable += "</table>";

    $(this.board.instance).append(gameTable);

    //init highlight
    game.board.currentCell = document.getElementById(game.board.currentCellId);
    if(game.board.currentCell != null){
        game.board.currentCell.className = game.board.currentCell.className + " highlight";
    }
    this.board.fillWithColors();
};

game.drawGameBoard = function(){
    this.board.instance = document.createElement('div');
    $(this.parentPane).append(this.board.instance);

    $(this.board.instance).css({
        'position':'absolute',
        'top':this.board.top,
        'left':this.board.left,
        'width':this.board.width,
        'height':this.board.height
    }).css(this.board.style);
};

game.prepareGameBoard = function(){
    //make 10 px space
    borderSpacing = 2 * 2;
    this.board.top = 30;
    this.board.left = 10;
    min = Math.min($(window).width() / 2, $(window).height() / 2);
    this.board.width = min + this.board.left;
    this.board.height = min + this.board.top;
    this.section.width = Math.floor(this.board.width / 4) - borderSpacing;
    this.section.height = Math.floor(this.board.width / 4) - borderSpacing;
    this.drawGameBoard();
};

game.init = function(){
    this.prepareGameBoard();
    this.initStartBoard();
    $(document).keydown(this.keyPress);
    //TODO more stuff here
};

function init(){
    game.init();
}