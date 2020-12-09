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

// function renderGallery() {
//     var 
// }

function onImgGallery() {
    var elImgContainer = document.querySelector('.gallery-container');
    var elMemesContainer = document.querySelector('.memes-container');
    elImgContainer.style.display = 'block';
    elMemesContainer.style.display = 'none';
}

function onEditMeme(imgId) {
    var elImgContainer = document.querySelector('.gallery-container');
    var elMemesContainer = document.querySelector('.memes-container');
    elImgContainer.style.display = 'none';
    elMemesContainer.style.display = 'block';

    drawImg(imgId);
}

function onTxtDraw(text) {
    console.log(text);
    drawText(text, 50, 50);
}