'use strict';

console.log('controller js is connected');
var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.querySelector('.canvas-box')
    // console.log(gCanvas)
    gCtx = gCanvas.getContext('2d')
    // console.log(gCtx)


    
}

// function renderCanvas() {
//     var 
// }

function onImgGallery() {
    var elImgContainer = document.querySelector('.gallery-container');
    var elMemesContainer = document.querySelector('.memes-container');
    elImgContainer.style.display = 'block';
    elMemesContainer.style.display = 'none';
}

function onEditMeme(imgId) {
    console.log('onEditMeme');
    var elImgContainer = document.querySelector('.gallery-container');
    var elMemesContainer = document.querySelector('.memes-container');
    elImgContainer.style.display = 'none';
    elMemesContainer.style.display = 'block';

    drawImg(imgId);


}

function onTxtDraw(text) {
    console.log(text);
    // elInputTxt.onkeyup = function (){
    //     console.log('elInputTxt=', elInputTxt);
    //     document.querySelector('.canvas-box').innerHTML = elInputTxt;
    // }
    drawText(text, 150, 50);
}