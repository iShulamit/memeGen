'use strict';

const KEY = 'memes';

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
    { id: 1, url: '../../meme-imgs (square)/1.jpg', keywords: ['man', 'politician'] },
    { id: 2, url: '../../meme-imgs (square)/2.jpg', keywords: ['animals'] },
    { id: 3, url: '../../meme-imgs (square)/3.jpg', keywords: ['animals', 'baby'] },
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red',
    }]
}

function drawImg(imgId) {
    var img = gImgs.find(function (img) {
        return img.id === imgId;
    });
    var drawnImg = new Image();
    drawnImg.src = img.url;

    gCtx.drawImage(drawnImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawText(text, x, y) {
    gCtx.lineWidth = '1.5'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
     gCtx.font = '40px Impact'
    //gCtx.font = 'italic small-caps 900 40px serif'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

// DELETE

// UPDATE ?

// READ

//CREATE

// function _saveMemesToStorage() {
//     saveToStorage(KEY, gMemes)
// }