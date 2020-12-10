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
        drawText(line))

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
    addTxtLine();
    renderCanvas();
}

function onDeleteTxt() {
    deleteLine();
}

function onAlignLeft() {
    console.log('left');
    updateAlign('right');
}

function onAlignRight() {
    updateAlign('left');
}

function onAlignCenter() {
    updateAlign('center');
}

function onIncFont() {
    changeFontSize(2);
}

function onDecFont() {
    changeFontSize(-2);
}

function onTxtStroke(){
    toggleTxtStroke();
}