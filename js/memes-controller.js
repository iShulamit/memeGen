'use strict';

var gCanvas; // move to controller
var gCtx; // move to controller

function onInit() {
    gCanvas = document.querySelector('.canvas-box')
    gCtx = gCanvas.getContext('2d')
    gCanvas.width = 450;
    gCanvas.height = 450;
    renderGalleryGrid();
}

function renderGalleryGrid() {
    var elGrid = document.querySelector('.grid-container');
    elGrid.innerHTML = gImgs.map(img => {
        return `<img src="${img.url}" onclick="onEditMeme(${img.id})" class="img img${img.id}" />`
    }).join('\n');
}

function renderCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImg(gMeme.selectedImgId);
    // var img = gImgs.find(function (img) {
    //     return img.id === imgId;
    // });
    // var drawnImg = new Image();
    // drawnImg.src = img.url;
    // drawnImg.onload(() => {
    //     gCtx.drawImage(drawnImg, 0, 0, gCanvas.width, gCanvas.height);
    //     gMeme.lines.forEach(line => drawText(line))
    // })
    gMeme.lines.forEach(line => drawText(line))

    renderStrokeBtn();
    renderAlignBtns();
}

function drawImg(imgId) { // controller
    var img = gImgs.find(function (img) {
        return img.id === imgId;
    });
    var drawnImg = new Image();
    drawnImg.src = img.url;

    gCtx.drawImage(drawnImg, 0, 0, gCanvas.width, gCanvas.height);
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

function renderStrokeBtn() { // put on class list and do add/remove
    var elToggleStrokeBtn = document.querySelector('.txt-stroke');
    if (gMeme.lines[gMeme.selectedLineIdx].isLineStroke) {
        elToggleStrokeBtn.style.border = '1px solid black';
        elToggleStrokeBtn.style.background = 'linear-gradient(rgb(215, 232, 237), rgb(165, 174, 177))';
    } else {
        elToggleStrokeBtn.style.border = 'none';
        elToggleStrokeBtn.style.background = 'linear-gradient(rgb(165, 174, 177),rgb(215, 232, 237)';
    }
}

function drawText(line) { // controller
    gCtx.direction = 'ltr';
    gCtx.lineWidth = '2';
    gCtx.fillStyle = line.color;
    gCtx.font = line.size + 'px Impact';
    gCtx.textAlign = line.align;

    switch (line.align) {
        case 'left':
            line.x = gCanvas.width * X_LINE_DEFAULT;
            break;
        case 'center':
            line.x = gCanvas.width / 2;
            break;
        case 'right':
            line.x = gCanvas.width * (1 - X_LINE_DEFAULT);
            break;
        default:
            break;
    }

    gCtx.fillText(line.txt, line.x, line.y)
    if (line.isLineStroke) {
        gCtx.strokeStyle = 'black';
        gCtx.strokeText(line.txt, line.x, line.y, gCanvas.width * (1 - (2 * X_LINE_DEFAULT)))
    }
}

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

    initGmeme(imgId);
    drawImg(imgId);
}

function onTxtUpdate(text) {
    updateMemeLine(text);
    renderCanvas();
}

function onDeleteTxt() { // Txt >> Line
    deleteLine();
    renderCanvas();
}

function onAlignLeft() {
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
    renderCanvas();
}

function onTxtColor() {
    var elColorPickerBtn = document.querySelector('.change-color');
    elColorPickerBtn.style.display = 'block'

    var elColorPalleteBtn = document.querySelector('.txt-color');
    elColorPalleteBtn.style.display = 'none';
}

function onChangeColor() {
    var elColor = document.querySelector('.change-color').value;
    changeTxtColor(elColor);
}

function onAddTxtLine() {
    document.querySelector('.input').value = '';
    addLine();
}

function onDeleteTxt() {
    document.querySelector('.input').value = '';
    deleteLine();
    onNextRow();
    renderCanvas();
}

function onNextRow() {
    moveToNextRow();
    showInputTxtRow();
}

function showInputTxtRow() {
    var elRowInput = document.querySelector('.input');
    elRowInput.value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function onDownloadImg(el) {
    var image = gCanvas.toDataURL("image/jpg");
    el.href = image;
}

function onMoveLineUp() {
    moveLine(-MOVE_LINE_STEP);
    renderCanvas();
}

function onMoveLineDown() {
    moveLine(MOVE_LINE_STEP);
    renderCanvas();
}

