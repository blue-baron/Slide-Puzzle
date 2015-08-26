/*jshint browser: true, devel: true*/

function slidePuzzle(gridSpaces, sourceImg) {

    //gridSpaces available options will all be square numbers as
    //the number of rows is determined with Math.sqrt.
    this.gridSpaces = gridSpaces || 9;
    
    this.sourceImg = sourceImg;        
    this.tileGrid = [];
    this.tileCoords = [];
    
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
        this[grid][i] = tilesArray.splice(0, this.numRows);
        var row = this[grid][i],
           xPos = 0; 
           
        for (var j = 0; j < row.length; j++) {
            //Add x position to tiles.
            row[j].xPos_final = xPos;
            row[j].style.left = xPos + 'px';
               
            //Add y position to tiles. 
            row[j].yPos_final = yPos;
            row[j].style.top = yPos + 'px';
            
            //Add x & y coords to array of final positions
            this.tileCoords.push({xPos: xPos, yPos: yPos});
               
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
    for (var prop in this.tileGrid) {
            
        for (i = 0; i < this.tileGrid[prop].length; i++) {
            var puzzleImg = document.createElement('img');
            puzzleImg.src = 'images/Rooster-1.jpg';
            puzzleImg.id = 'tileImg' + imgId;
            puzzleImg.style.width = this.sliderWidth + 'px';
            puzzleImg.style.position = 'absolute';
                
            this.tileGrid[prop][i].appendChild(puzzleImg);

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
    var tiles = [];
    for (var i = 0; i < this.tileCoords.length; i++) {
        tiles[i] = this.tileCoords[i];
    }
    var randomCoords = [];
    
    //Place tiles into randomCoords [] in a random order.
    for (i = 0; i < this.numTiles; i++) {
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

slidePuzzle.prototype.clickEvents = function() {
    //Add click event listener to each tile
    var testTile = nodelistToArray('puzzleTile');
    
    testTile.forEach(function(item) {
        controller.animateTile(item);
    });
};



var controller = {

    gridSpaces: [],
    
    finalPositions: [],
    
    initializeGrid: function (puzzle) {
        
        //Create Rows for occupiedSpaces
        var rows = puzzle.numRows;
        for (var i = 0; i < rows; i++) {
            this.gridSpaces.push([]);
            //Create each space within occupiedSpaces rows.
            //Include xPos, yPos & whether space is empty.
            for (var j = 0; j < rows; j++) {
                if (puzzle.tileGrid[i][j]) {
                this.gridSpaces[i].push( {
                    empty: false,
                    xPos: puzzle.tileGrid[i][j].xPos_final,
                    yPos: puzzle.tileGrid[i][j].yPos_final
                    } );
                } else {
                    this.gridSpaces[i].push( {
                        empty: true,
                        xPos: puzzle.tileWidth * (rows - 1),
                        yPos: puzzle.tileHeight * (rows - 1)
                    } );    
                }
            }//end for j
        }//end for i
    },
    
    animateTile: function(item){
        item.addEventListener('click', function () {
            var xPosCurrent = this.offsetTop;
            var yPosCurrent = this.offsetLeft;
            
            this.style.top = (xPosCurrent + puzzle.tileHeight) + 'px';
            
        });     
    },
    
    
    
};//end controller


//HELPER FUNCTIONS
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
    return Math.floor(Math.random() * (max - min + 1)) ;
}





//INITIALIZE PUZZLE
//var init = function () {
    
    var puzzle = new slidePuzzle();

    puzzle.puzzleSize();
    puzzle.createTiles();
    puzzle.createGrid('tileGrid');
    puzzle.placeImages();
    puzzle.randomizeTiles();
    puzzle.clickEvents();

    controller.initializeGrid(puzzle);

//};
