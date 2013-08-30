var game = {};//whole game instance
game.board = {};//game board
game.colorsNumber = 4;
game.parentPane = 'body';//parent pane element
game.board.currentRow = {};
game.board.currentRowId = 'td00';
game.board.style = {
    'background':'#fff',
    'opacity':1,
    'border':'1px solid #ddd'
};
game.board.highlight = {
    'border-color': 'orange'
};
game.section = {};

game.initStartBoard = function(){
    var gameTable = "<table>"
    for(i = 0; i < this.colorsNumber; ++i){
        gameTable += '<tr>';
        for(j = 0; j < this.colorsNumber; ++j){
            gameTable += "<td id=" + "td" + i + j + " class='face-down' width=" + this.section.width + " height=" + this.section.height + ">" + '</td>';
        }
        gameTable += '</tr>';
    }
    gameTable += "</table>";

    $(this.board.instance).append(gameTable);

    //init highlight
    game.board.currentRow = document.getElementById(game.board.currentRowId);
    if(game.board.currentRow != null){
        game.board.currentRow.className = game.board.currentRow.className + " highlight";
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
    //TODO more stuff here
};

function init(){
    game.init();
}