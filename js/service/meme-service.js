'use strict'

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    url: '',
    lines: [
        {
            txt: '',
            size: 30,
            align: 'center',
            color: 'white',
            pos:0.2
        },
        {
            txt: '',
            size: 30,
            align: 'center',
            color: 'white',
            pos:0.9
        }
    ]
}

function setLineTxt(txt) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = txt
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
    return gMeme.selectedLineIdx
}

function changeSize(size) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size += size

}

function changeColor(color) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].color = color
}

function setImg(elImg) {
    gMeme.selectedImgId = elImg.dataset.id
    gMeme.url = elImg
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

