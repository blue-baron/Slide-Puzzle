/*jshint browser: true, devel: true*/

function slidePuzzle(gridSpaces, sourceImg) {

    //gridSpaces available options will all be square numbers as
    //the number of rows is determined with Math.sqrt.
    this.gridSpaces = gridSpaces || 9;
    
    this.sourceImg = sourceImg;        
    this.grid = {};
    
}//End slidePuzzle constructor function.
   

slidePuzzle.prototype.puzzleSize = function(){
        //Set width of puzzle.
        var puzzleWrapper = document.getElementById('puzzleWrapper'); 
        this.sliderWidth = puzzleWrapper.clientWidth;
        
        //Get source img if not present.
        if (!this.sourceImg) {
            this.sourceImg = document.getElementById('imgSource');
        }
        
        //Set puzzle img to puzzle width.
        this.sourceImg.style.width = this.sliderWidth + "px";
        
        //Determine puzzle img height & set puzzle wrapper height.
        this.sliderHeight = this.sourceImg.clientHeight;
        puzzleWrapper.style.height = this.sliderHeight + 'px';
        
};
    
slidePuzzle.prototype.createTiles = function () {
        //Determine number of rows in puzzle.
        this.numRows = Math.sqrt(this.gridSpaces);
        
        //Determine number of puzzle tiles.
        this.numTiles = this.gridSpaces - 1;
        
        //Determine individual tile dimensions.
        this.tileWidth = this.sliderWidth / this.numRows;
        this.tileHeight = this.sliderHeight / this.numRows;
        
        //Add tiles (divs) to slider.
        var puzzle = document.getElementById('puzzleWrapper');
        
        for (var i = 0; i < this.numTiles; i++) {
            var newTile = document.createElement('div');
            newTile.id = 'tile' + i;
            newTile.className = 'puzzleTile';
            newTile.style.width = this.tileWidth + 'px';
            newTile.style.height = this.tileHeight + 'px';
            puzzle.appendChild(newTile);
        }//End numTiles for loop.
         
};
    
slidePuzzle.prototype.gridSetup = function () {
       
       //Create array of tiles because
       //getElementsByClassName result isn't actually an array.
       var tiles = document.getElementsByClassName('puzzleTile'),
           tilesArray = [],
           yPos = 0;
       
       for (var i = 0; i < tiles.length; i++) {
           tilesArray.push(tiles[i]);
       }
       
       //Create grid rows and place / position tiles in each row.
       for (i = 0; i < this.numRows; i++) {
           this.grid['row' + i] = tilesArray.splice(0, this.numRows);
          
           var row = this.grid['row' + i],
               xPos = 0; 
           
           for (var j = 0; j < row.length; j++) {
               
               //Add x position to tiles.
               row[j].xPos_final = xPos;
               row[j].style.left = xPos + 'px';
               
               //Add y position to tiles. 
               row[j].yPos_final = yPos;
               row[j].style.top = yPos + 'px';
               
               //Increment xPos here within the loop so it increments by tile.
               xPos += this.tileWidth;
            }//end row for loop
            
            //Increment yPos outside row loop so it increments by ROW not tile.
            yPos += this.tileHeight;

        }//End grid creation for loop.
       
   };

slidePuzzle.prototype.placeImages = function() {
        
        var i;
        var imgId = 0;
        
        //Loop through grid rows and position place img in each tile.
        for (var prop in this.grid) {
            
            for (i = 0; i < this.grid[prop].length; i++) {
                
                var puzzleImg = document.createElement('img');
                puzzleImg.src = 'images/Rooster-1.jpg';
                puzzleImg.id = 'tileImg' + imgId;
                puzzleImg.style.width = this.sliderWidth + 'px';
                puzzleImg.style.position = 'absolute';
                
                this.grid[prop][i].appendChild(puzzleImg);

                imgId ++;
                
            }//End rows for loop.
        
        }//End grid for in loop.
    
        //Get tile images and position correctly within tile
        for (i = 0; i < this.numTiles; i++) {
            var tileImg = document.getElementById('tileImg' + i);
            tileImg.style.top = '-' + tileImg.parentNode.yPos_final + 'px';
            tileImg.style.left = '-' + tileImg.parentNode.xPos_final + 'px';
        }

};



//INITIALIZE PUZZLE
var puzzle = new slidePuzzle();

puzzle.puzzleSize();
puzzle.createTiles();
puzzle.gridSetup();
puzzle.placeImages();