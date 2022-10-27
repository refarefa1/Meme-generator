'use strict'

var gUser = {
    isSaving: false,
}
var gSavedMemes = []
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'TEXT',
            font: 'impact',
            size: 50,
            align: 'center',
            color: 'white',
            pos: 0.2,
            isStroke: false,
        },
        {
            txt: 'TEXT',
            font: 'impact',
            size: 50,
            align: 'center',
            color: 'white',
            pos: 0.9,
            isStroke: false,
        }
    ]
}

function resetMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        url: '',
        lines: [
            {
                txt: 'TEXT',
                font: 'impact',
                size: 50,
                align: 'center',
                color: 'white',
                pos: 0.2,
                isStroke: false
            },
            {
                txt: 'TEXT',
                font: 'impact',
                size: 50,
                align: 'center',
                color: 'white',
                pos: 0.9,
                isStroke: false
            }
        ]
    }
}

function getUser() {
    return gUser
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}

function setSavedMeme(idx) {
    const savedMemes = loadFromStorage('savedMemesDB')
    gMeme = savedMemes[idx]
}

function saveMeme() {
    const url = gMeme.url
    const meme = JSON.parse(JSON.stringify(gMeme));
    meme.url = url
    gSavedMemes.push(meme)
    saveToStorage('savedMemesDB', gSavedMemes)
    const savedMemes = loadFromStorage('savedMemesDB')
    return savedMemes
}

function changeFont(font) {
    var lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].font = font
}

function chooseEmoji(emoji) {
    addLine(emoji)
}

function checkIfStroke() {
    var lineIdx = gMeme.selectedLineIdx
    return gMeme.lines[lineIdx].isStroke
}

function strokeText() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].isStroke = !gMeme.lines[lineIdx].isStroke
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (!gMeme.lines[gMeme.selectedLineIdx]) gMeme.selectedLineIdx--
}

function alignText(direction) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].align = direction
}

function addLine(txt = 'TEXT') {
    const line = {
        txt,
        font: 'impact',
        size: 50,
        align: 'center',
        color: 'white',
        pos: 0.5,
        isStroke: false
    }
    gMeme.lines.push(line)
    const lastLine = gMeme.lines.length - 1
    gMeme.selectedLineIdx = lastLine
    console.log(gMeme);
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

