'use strict';

const KEY = 'memes';
var gCanvas;
var gCtx;

const X_LINE_DEFAULT = 0.1;
const Y_LINE_DEFAULT = 0.07;

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

var gMeme;

function initGmeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: []
    }
    addLine();
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
        line.x = X_LINE_DEFAULT * gCanvas.width; 
        line.y = Y_LINE_DEFAULT * gCanvas.height;
    } else if (gMeme.lines.length === 1) {
        line.x = X_LINE_DEFAULT * gCanvas.width;
        line.y = ((1 - Y_LINE_DEFAULT) * gCanvas.height);
    } else {
        line.x = X_LINE_DEFAULT * gCanvas.height;
        line.y = gCanvas.height / 2 ;
    }
    //console.log('line.x=' + line.x + ' line.y=' + line.y + ' gCanvs.width=' + gCanvas.width)
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
    //console.log('x=',line.x, ' y=' ,line.y);
    // gCtx.width = window.innerWidth;
    // gCtx.height = window.innerHeight;
    console.log(gCtx.width, gCtx.height);
    gCtx.direction = 'ltr';
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