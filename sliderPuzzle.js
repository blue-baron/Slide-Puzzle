/*jshint browser: true, devel: true*/

var slidePuzzle = {
    sourceImage: '',
    
    sliderWidth: 0,
    sliderHeight: 0,
    
    numTiles: 9,
    numRows: 0,
    tileWidth: 0,
    tileHeight: 0,
    
    grid: {},
    
    puzzleSize: function(){
        var puzzleWrapper = document.getElementById('puzzleWrapper'); 
        //get width of puzzle
        this.sliderWidth = puzzleWrapper.clientWidth;
        
        //set puzzle img to puzzle width
        this.sourceImage = document.getElementById('imgSource');
        this.sourceImage.style.width = this.sliderWidth + "px";
        
        //determine puzzle img height & set puzzle wrapper height
        this.sliderHeight = this.sourceImage.clientHeight;
        puzzleWrapper.style.height = this.sliderHeight + 'px';
        
    },
    
    createTiles: function () {
        //determine number of rows in puzzle
        this.numRows = Math.sqrt(this.numTiles);
        
        //determine individual tile dimensions
        this.tileWidth = this.sliderWidth / this.numRows;
        this.tileHeight = this.sliderHeight / this.numRows;
        
        //add tiles (divs) to slider
        var puzzle = document.getElementById('puzzleWrapper');
        for (var i = 0; i < this.numTiles; i++) {
            var newTile = document.createElement('div');
            newTile.id = 'tile' + i;
            newTile.className = 'puzzleTile';
            newTile.style.width = this.tileWidth + 'px';
            newTile.style.height = this.tileHeight + 'px';
            puzzle.appendChild(newTile);
        }//end for
         
    },
    
   gridSetup: function () {
       
       //Create array of tiles because
       //getElementsByClassName result isn't actually an array
       var tiles = document.getElementsByClassName('puzzleTile');
       var tilesArray = [];
   
       for (var i = 0; i < tiles.length; i++) {
           tilesArray.push(tiles[i]);
       }
       
       //Create grid rows and place / position tiles in each row
       for (i = 0; i < this.numRows; i++) {
           this.grid['row' + i] = tilesArray.splice(0, 3);
          
           var row = this.grid['row' + i];
           var yPos = 0;
           var xPos = 0;
           
           //add x position to tiles
           
           
           //add y position to tiles
           for (var j = 0; j < row.length; j++) {
                row[j].yPos_final = yPos;
                row[j].style.top = yPos + 'px';
                yPos = yPos + this.tileHeight;
            }
           
        }//end grid creation for loop
       
   }
    
};//end setSlider

slidePuzzle.puzzleSize();
slidePuzzle.createTiles();
slidePuzzle.gridSetup();