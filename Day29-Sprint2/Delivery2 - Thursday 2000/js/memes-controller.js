'use strict';

console.log('controller js is connected');


function onInit() {
    gCanvas = document.querySelector('.canvas-box')
    // console.log(gCanvas)
    gCtx = gCanvas.getContext('2d')
     // console.log(gCtx)


    
}

function renderCanvas() {
    //console.log('render');
    //console.log('gMeme=', gMeme)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImg(gMeme.selectedImgId);

    gMeme.lines.forEach(line =>
        drawText(line.txt, line.x, line.y))

}

function onImgGallery() {
    var elImgContainer = document.querySelector('.gallery-container');
    var elMemesContainer = document.querySelector('.memes-container');
    elImgContainer.style.display = 'block';
    elMemesContainer.style.display = 'none';
}

function onEditMeme(imgId) {
    // console.log('onEditMeme');
    var elImgContainer = document.querySelector('.gallery-container');
    var elMemesContainer = document.querySelector('.memes-container');
    elImgContainer.style.display = 'none';
    elMemesContainer.style.display = 'block';

    drawImg(imgId);
}

function onTxtUpdate(text) {
    // console.log(text);
    updateMemeLine(text);
}

function onAddTxtLine() {
    
}

function onDeleteTxt() {
    deleteLine();
}