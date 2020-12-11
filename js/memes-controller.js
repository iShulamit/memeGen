'use strict';

console.log('controller js is connected');


function onInit() {
    gCanvas = document.querySelector('.canvas-box')
    // console.log(gCanvas)
    gCtx = gCanvas.getContext('2d')
    // console.log(gCtx)    
}

function renderCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImg(gMeme.selectedImgId);

    gMeme.lines.forEach(line =>
        drawText(line))

    renderStrokeBtn();
    renderAlignBtns();
}

function renderAlignBtns() {
    var align = gMeme.lines[gMeme.selectedLineIdx].align;
    var elAlignBtns = document.querySelectorAll('.align');

    elAlignBtns.forEach(button => {
        if (button.className === 'control align align-' + align) {
            button.style.border = 'none';
            button.style.background = 'linear-gradient(rgb(165, 174, 177),rgb(215, 232, 237)';
        } else {
            button.style.border = '1px solid black';
            button.style.background = 'linear-gradient(rgb(215, 232, 237), rgb(165, 174, 177))';
        }
    });
}

function renderStrokeBtn() {
    var elToggleStrokeBtn = document.querySelector('.txt-stroke');
    if (gMeme.lines[gMeme.selectedLineIdx].isLineStroke) {
        elToggleStrokeBtn.style.border = '1px solid black';
        elToggleStrokeBtn.style.background = 'linear-gradient(rgb(215, 232, 237), rgb(165, 174, 177))';
    } else {
        elToggleStrokeBtn.style.border = 'none';
        elToggleStrokeBtn.style.background = 'linear-gradient(rgb(165, 174, 177),rgb(215, 232, 237)';
    }
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
    //console.log('left');
    updateAlign('left');
}

function onAlignRight() {
    updateAlign('right');
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

function onTxtStroke() {
    toggleTxtStroke();
}

function onTxtColor() {
    console.log('color picker');
    var elColorPickerBtn = document.querySelector('.change-color');
    elColorPickerBtn.style.display = 'block'

    var elColorPalleteBtn = document.querySelector('.txt-color');
    elColorPalleteBtn.style.display = 'none';
}

function onChangeColor() {
    var elColor = document.querySelector('.change-color').value;

    console.log('elColor=', elColor);
    changeTxtColor(elColor);
}