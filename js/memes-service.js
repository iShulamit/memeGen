'use strict';

const KEY = 'memes';
// var gCanvas; // move to controller
// var gCtx; // move to controller

const X_LINE_DEFAULT = 0.1;
const Y_LINE_DEFAULT = 0.07;
const MOVE_LINE_STEP = 0.1;

var gKeywords = {
    'happy': 12,
    'funny': 1,
    'woman': 0,
    'man': 1,
    'animals': 0,
    'baby': 1,
};

var gImgs = [
    { id: 1, url: './meme-imgs (square)/1.jpg', keywords: ['man', 'politician'] },
    { id: 2, url: './meme-imgs (square)/2.jpg', keywords: ['animals'] },
    { id: 3, url: './meme-imgs (square)/3.jpg', keywords: ['animals', 'baby'] },
    { id: 4, url: './meme-imgs (square)/4.jpg', keywords: ['animals'] },
    { id: 5, url: './meme-imgs (square)/5.jpg', keywords: ['baby'] },
    { id: 6, url: './meme-imgs (square)/6.jpg', keywords: ['man'] },
    { id: 7, url: './meme-imgs (square)/7.jpg', keywords: ['baby'] },
    { id: 8, url: './meme-imgs (square)/8.jpg', keywords: ['man'] },
    { id: 9, url: './meme-imgs (square)/9.jpg', keywords: ['baby'] },
    { id: 10, url: './meme-imgs (square)/10.jpg', keywords: ['man'] },
    { id: 11, url: './meme-imgs (square)/11.jpg', keywords: ['man'] },
    { id: 12, url: './meme-imgs (square)/12.jpg', keywords: ['man'] },
    { id: 13, url: './meme-imgs (square)/13.jpg', keywords: ['man'] },
    { id: 14, url: './meme-imgs (square)/14.jpg', keywords: ['man'] },
    { id: 15, url: './meme-imgs (square)/15.jpg', keywords: ['man'] },
    { id: 16, url: './meme-imgs (square)/16.jpg', keywords: ['man'] },
    { id: 17, url: './meme-imgs (square)/17.jpg', keywords: ['man'] },
    { id: 18, url: './meme-imgs (square)/18.jpg', keywords: ['cartoon'] },
];

var gMeme;

function initGmeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: []
    }
    addLine();
}

// function drawImg(imgId) { // controller
//     var img = gImgs.find(function (img) {
//         return img.id === imgId;
//     });
//     var drawnImg = new Image();
//     drawnImg.src = img.url;

//     gCtx.drawImage(drawnImg, 0, 0, gCanvas.width, gCanvas.height);
// }

// UPDATE
function updateMemeLine(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    // renderCanvas();
}

function updateAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
    renderCanvas();
}

function changeFontSize(fontSizeDif) {
    gMeme.lines[gMeme.selectedLineIdx].size += fontSizeDif;
    renderCanvas();
}

function changeTxtColor(color) { 
    // console.log(color);
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    renderCanvas();
}

//CREATE
function addLine() {
    var line = _createNewLine();
    setNewLineLocation(line);
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function _createNewLine() {
    return {
        txt: '',
        size: 32,
        align: 'center',
        color: 'white',
        x: 100,
        y: 100,
        isLineStroke: true,
    }
}

function setNewLineLocation(line) {
    if (gMeme.lines.length === 0) {
        line.y = getMinYLocation();
    } else if (gMeme.lines.length === 1) {
        line.y = getMaxYLocation();
    } else {
        line.y = gCanvas.height / 2;
    }
}

function getMaxYLocation() {
    return ((1 - Y_LINE_DEFAULT) * gCanvas.height);
}

function getMinYLocation() {
    return Y_LINE_DEFAULT * gCanvas.height;
}

// DELETE
function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (gMeme.selectedLineIdx > 0) {
        gMeme.selectedLineIdx -= 1;
    }
    if (gMeme.lines.length === 0) {
        addLine();
    }
    // renderCanvas(); // move to controller related func
}

function toggleTxtStroke() {
    var line = gMeme.lines[gMeme.selectedLineIdx];
    line.isLineStroke = !line.isLineStroke;
    // renderCanvas(); //
}

// function drawText(line) { // controller
//     gCtx.direction = 'ltr';
//     gCtx.lineWidth = '2';
//     gCtx.fillStyle = line.color;
//     gCtx.font = line.size + 'px Impact';
//     gCtx.textAlign = line.align;

//     switch (line.align) {
//         case 'left':
//             line.x = gCanvas.width * X_LINE_DEFAULT;
//             break;
//         case 'center':
//             line.x = gCanvas.width / 2;
//             break;
//         case 'right':
//             line.x = gCanvas.width * (1 - X_LINE_DEFAULT);
//             break;
//         default:
//             break;
//     }

//     gCtx.fillText(line.txt, line.x, line.y)
//     if (line.isLineStroke) {
//         gCtx.strokeStyle = 'black';
//         gCtx.strokeText(line.txt, line.x, line.y, gCanvas.width * (1 - (2 * X_LINE_DEFAULT)))
//     }
// }

function moveToNextRow() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length;
}

function moveLine(step) {
    gMeme.lines[gMeme.selectedLineIdx].y += step * gCanvas.height;
    if (gMeme.lines[gMeme.selectedLineIdx].y < getMinYLocation()) {
        gMeme.lines[gMeme.selectedLineIdx].y = getMinYLocation();
    } else if (gMeme.lines[gMeme.selectedLineIdx].y > getMaxYLocation()) {
        gMeme.lines[gMeme.selectedLineIdx].y = getMaxYLocation();
    }
    // renderCanvas(); //controler
}

// function _saveMemesToStorage() {
//     saveToStorage(KEY, gMemes)
// }