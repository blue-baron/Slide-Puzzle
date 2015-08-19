/*jshint browser: true, devel: true*/

var setSlider = {
    sourceImage: '',
    
    sliderWidth: 0,
    sliderHeight: 0,
    
    numTiles: 0,
    
    setImg: function(){
        this.sliderWidth = document.getElementById('sliderWrapper').clientWidth;
        this.sourceImage = document.getElementById('imgSource');
        },
};

setSlider.setImg();