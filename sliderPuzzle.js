/*jshint browser: true, devel: true*/

function slidePuzzle(gridSpaces, sourceImg) {

    //gridSpaces available options will all be square numbers as
    //the number of rows is determined with Math.sqrt.
    this.gridSpaces = gridSpaces || 9;
    
    this.sourceImg = sourceImg;        
    this.gridFinal = {};
    this.tileCoordsFinal = []; 
    
}//End slidePuzzle constructor function.
   

slidePuzzle.prototype.puzzleSize = function(){
    //Set width of puzzle.
    var puzzleWrapper = document.getElementById('puzzleWrapper'); 
    this.sliderWidth = puzzleWrapper.clientWidth;
        
    //Use default source img if not set.
    if (!this.sourceImg) {
        var sourceImg = document.getElementById('imgSource');
        this.sourceImg = sourceImg;
    }
        
    //Set puzzle img to puzzle width.
    this.sourceImg.style.width = this.sliderWidth + "px";
        
    //Determine puzzle img height & set puzzle wrapper height.
    this.sliderHeight = this.sourceImg.clientHeight;
    puzzleWrapper.style.height = this.sliderHeight + 'px'; 
    
    //Setup small puzzle reference image.
    this.sourceImg.style.visibility = 'visible';
    this.sourceImg.style.width = 200 + "px";    
};
    
slidePuzzle.prototype.createTiles = function () {
    //Determine number of rows in puzzle.
    this.numRows = Math.sqrt(this.gridSpaces);
    
    //Determine number of puzzle tiles.
    this.numTiles = this.gridSpaces - 1;
        
    //Determine individual tile dimensions.
    var borderwidth = 0.5;
    this.tileWidth = (this.sliderWidth / this.numRows) - borderwidth;
    this.tileHeight = this.sliderHeight / this.numRows  - borderwidth;
        
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
    
slidePuzzle.prototype.createGrid = function (grid) { 
    //Place tiles in an array.
    var tilesArray = nodelistToArray('puzzleTile');
       
    //Create grid rows and place / position tiles in each row.
    var yPos = 0;
       
    for (var i = 0; i < this.numRows; i++) {
        this[grid]['row' + i] = tilesArray.splice(0, this.numRows);
        var row = this[grid]['row' + i],
           xPos = 0; 
           
        for (var j = 0; j < row.length; j++) {
            //Add x position to tiles.
            row[j].xPos_final = xPos;
            row[j].style.left = xPos + 'px';
               
            //Add y position to tiles. 
            row[j].yPos_final = yPos;
            row[j].style.top = yPos + 'px';
            
            //Add x & y coords to array of final positions
            this.tileCoordsFinal.push({xPos: xPos, yPos: yPos});
               
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
    for (var prop in this.gridFinal) {
            
        for (i = 0; i < this.gridFinal[prop].length; i++) {
            var puzzleImg = document.createElement('img');
            puzzleImg.src = 'images/Rooster-1.jpg';
            puzzleImg.id = 'tileImg' + imgId;
            puzzleImg.style.width = this.sliderWidth + 'px';
            puzzleImg.style.position = 'absolute';
                
            this.gridFinal[prop][i].appendChild(puzzleImg);

            imgId ++;
                
        }//End rows for loop.
    }//End grid for in loop.
    
    //Get tile images and position correctly within tile.
    for (i = 0; i < this.numTiles; i++) {
        var tileImg = document.getElementById('tileImg' + i);
        tileImg.style.top = '-' + tileImg.parentNode.yPos_final + 'px';
        tileImg.style.left = '-' + tileImg.parentNode.xPos_final + 'px';
    }
};

slidePuzzle.prototype.randomizeTiles = function () {
    var tiles = this.tileCoordsFinal;
    var randomCoords = [];
    
    //Place tiles into randomCoords [] in a random order.
    for (var i = 0; i < this.numTiles; i++) {
        var max = tiles.length;
        var randomNum = randomInt(1, max);
        randomCoords.push(tiles[randomNum]);
        tiles.splice(randomNum, 1);
    }
    
    //Postion tiles randomly in grid, order determined by randomCoords [].    
    var newCoords = nodelistToArray('puzzleTile');
    for (i = 0; i < newCoords.length; i++) {    
        newCoords[i].style.left = randomCoords[i].xPos + 'px';
        newCoords[i].style.top = randomCoords[i].yPos + 'px';          
    }

};



function nodelistToArray (className) {
    var tiles = document.getElementsByClassName(className),
        tilesArray = [];
        
    for (var i = 0; i < tiles.length; i++) {
        tilesArray.push(tiles[i]);
    }
    return tilesArray;
}

function randomInt(min, max) {
    //This little baby is from the MDN Math.random page.
    //In order for it to be able to return 0 the min needs to be set to -1.
    return Math.floor(Math.random() * (max - min + 1)) ;
}


//INITIALIZE PUZZLE
//var init = function () {
    
    var puzzle = new slidePuzzle();

    puzzle.puzzleSize();
    puzzle.createTiles();
    puzzle.createGrid('gridFinal');
    puzzle.placeImages();
    puzzle.randomizeTiles();

//};
