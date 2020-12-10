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
    { id: 1, url: '../meme-imgs (square)/1.jpg', keywords: ['man', 'politician'] },
    { id: 2, url: '../meme-imgs (square)/2.jpg', keywords: ['animals'] },
    { id: 3, url: '../meme-imgs (square)/3.jpg', keywords: ['animals', 'baby'] },
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'line1',
        size: 16,
        align: 'left',
        color: 'white',
        x: 50,
        y: 50,
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

//CREATE

function addTxtLine() {
    return gMeme.push(
        {
            txt: 'line2',
            size: 16,
            align: 'center',
            color: 'white',
            x: 100,
            y: 100,
        },
    );
}

function drawText(line) {
    //console.log('line=', text, x, y);
    gCtx.direction = 'ltr'
    gCtx.lineWidth = '1';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = line.color;
    gCtx.font = '40px Impact';
    gCtx.textAlign = line.align;

    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)

}

// DELETE

function deleteLine() {

    //renderCanvas()
}



// READ


// function _saveMemesToStorage() {
//     saveToStorage(KEY, gMemes)
// }