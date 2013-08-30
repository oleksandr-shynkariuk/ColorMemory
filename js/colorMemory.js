var game = {};//whole game instance
game.board = {};//game board
game.parentPane = 'body';//parent pane element
game.board.style = {
    'background':'#fff',
    'opacity':1,
    'border':'1px solid #ddd'
};
game.section = {};

game.initStartBoard = function(){

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
    this.board.width = Math.min($(window).width() / 2, $(window).height() / 2);
    this.board.height = this.board.width;
    //make 10 px space
    this.board.top = 10;
    this.board.left = 10;
    this.section.width = this.board.width / 4;
    this.section.height = this.board.width / 4;
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