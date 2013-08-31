var KEY = {
    'ENTER': 13,
    'LEFT':37,
    'RIGHT':39,
    'UP':38,
    'DOWN':40
};
var game = {};//whole game instance
game.board = {};//game board
game.colorsNumber = 8;

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
game.section = {};

game.board.updateCurrentCellId = function(){
    game.board.currentCellId = 'td' + game.board.currentRow + game.board.currentColumn;
}

game.moveDown = function(){
    prevRow = game.board.currentRow;
    prevCellId = game.board.currentCellId;
    game.board.currentRow = (1 + game.board.currentRow) % (game.board.size);
    game.board.updateCurrentCellId();
    game.board.currentCell = document.getElementById(game.board.currentCellId);
    if(game.board.currentCell != null){
        game.board.currentCell.className = game.board.currentCell.className + " highlight";
    }
    prevCell = document.getElementById(prevCellId);
    if(prevCell != null){
        prevCell.className = "face-down";
    }
    //TODO: relocate highlight to the next row
    //TODO: prohibit moving to already opened cards

};
game.moveUp = function(){
    if(game.board.currentRow == 0)
        game.board.currentRow = game.board.size - 1;
    else
        --game.board.currentRow;
};
game.moveLeft = function(){
    if(game.board.currentColumn == 0)
        game.board.currentColumn = game.board.size - 1;
    else
        --game.board.currentColumn;
};
game.moveRight = function(){
    game.board.currentColumn = (1 + game.board.currentColumn) % (game.board.size);
};
game.openCard = function(){
    //TODO: open current column
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
    this.board.top = 10;
    this.board.left = 10;
    min = Math.min($(window).width() / 2, $(window).height() / 2);
    this.board.width = min + this.board.top;
    this.board.height = min + this.board.left;
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