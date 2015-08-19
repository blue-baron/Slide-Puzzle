/*jshint browser: true, devel: true*/

var setSlider = {
    sourceImage: '',
    
    sliderWidth: 0,
    sliderHeight: 0,
    
    numTiles: 9,
    numRows: 0,
    tileWidth: 0,
    tileHeight: 0,
    
    tilePositions: {},
    
    sliderDimensions: function(){
        this.sliderWidth = document.getElementById('sliderWrapper').clientWidth;
        
        this.sourceImage = document.getElementById('imgSource');
        this.sourceImage.style.width = this.sliderWidth + "px";
        
        this.sliderHeight = this.sourceImage.clientHeight;
    },
    
    tileDimensions: function () {
        //determine tile dimensions
        this.numRows = Math.sqrt(this.numTiles);
        this.tileWidth = this.sliderWidth / this.numRows;
        this.tileHeight = this.sliderHeight / this.numRows;
        
        //add tiles (divs) to slider
        var slider = document.getElementById('sliderWrapper');
        for (var i = 0; i < this.numTiles; i++) {
            var newTile = document.createElement('div');
            newTile.id = 'tile' + i;
            newTile.className = 'sliderTile';
            newTile.style.width = this.tileWidth + 'px';
            newTile.style.height = this.tileHeight + 'px';
            slider.appendChild(newTile);
        }//end for
         
    }
    
   /* gridSetup: function () {
            
        }*/
    
};//end setSlider

setSlider.sliderDimensions();
setSlider.tileDimensions();
