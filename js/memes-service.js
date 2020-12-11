'use strict';

const KEY = 'memes';
var gCanvas;
var gCtx;

console.log('service js is connected');

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
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 32,
        align: 'left',
        color: 'white',
        x: 12.5,
        y: 30,
        isLineStroke: true,
    }]
}

// function _getImgId(imgId) {
//         var img = gImgs.find(function (img) {
//         return img.id === imgId;
//     });
// }

function drawImg(imgId) {
    var img = gImgs.find(function (img) {
        return img.id === imgId;
    });
    var drawnImg = new Image();
    drawnImg.src = img.url;

    gCtx.drawImage(drawnImg, 0, 0, gCanvas.width, gCanvas.height);
}

// UPDATE
function updateMemeLine(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    renderCanvas();
}

function updateAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
    renderCanvas();
}

function changeFontSize(fontSizeDif) {
    gMeme.lines[gMeme.selectedLineIdx].size += fontSizeDif;
    renderCanvas();
}

function changeTxtColor(elColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = elColor;
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
        line.x = 12.5;
        line.y = 30;
        //gCtx.width = offset.innerWidth / 2;
        //gCtx.height = offset.innerHeight / 2;
    } else if (gMeme.lines.length === 1) {
        line.x = 225;
        line.y = 125;
    } else {
        line.x = 125;
        line.y = 125;
    }
}

// DELETE

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (gMeme.selectedLineIdx > 0) {
        gMeme.selectedLineIdx -= 1;
    } else {
        _createNewLine();
    }
    renderCanvas();
}

function toggleTxtStroke() {
    var line = gMeme.lines[gMeme.selectedLineIdx];
    line.isLineStroke = !line.isLineStroke;
    renderCanvas();
}

function drawText(line) {
    //console.log('line=', line.txt, line.x, line.y);
    //gCtx.width = window.innerWidth / 2;
    //gCtx.height = window.innerWidth / 2;

    gCtx.direction = 'ltr'
    gCtx.lineWidth = '2.5';
    gCtx.fillStyle = line.color;
    gCtx.font = line.size + 'px Impact';
    var align = 'center';
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.x, line.y)

    if (line.isLineStroke) {
        gCtx.strokeStyle = 'black';
        gCtx.strokeText(line.txt, line.x, line.y)
    }
}


// function _saveMemesToStorage() {
//     saveToStorage(KEY, gMemes)
// }