'use strict'

const EMOJIS = ['🤑', '🤤', '🥴', '🤗', '🤓']
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


var gUser = {
    isSaving: false,
    isTextClicked: true,
    isDrag: false,
    isSizing: false
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
            color: 'white',
            isStroke: false,
            width: 0,
            height: 0,
            position: {
                x: 0,
                y: 50
            }
        },
        {
            txt: 'TEXT',
            font: 'impact',
            size: 50,
            color: 'white',
            isStroke: false,
            width: 0,
            height: 0,
            position: {
                x: 0,
                y: 0
            }
        }
    ]
}

function setTextClicked(bool) {
    gUser.isTextClicked = bool
}

function moveText(dx, dy) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].position.x += dx
    gMeme.lines[lineIdx].position.y += dy

}

function setDrag(bool) {
    gUser.isDrag = bool
}

function sizeText(dx, dy) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size += (dx + dy / 2)
}

function setSizing(bool) {
    gUser.isSizing = bool
}

function isSizingClicked(pos) {
    return (pos.x < gCirclePos.x + 20 && pos.x > gCirclePos.x - 25 &&
        pos.y < gCirclePos.y + 20 && pos.y > gCirclePos.y - 20)
}

function isTextClicked(pos) {
    const lines = gMeme.lines
    return lines.some((line, idx) => {

        if (pos.x < line.position.x + line.width / 2 &&
            pos.x > line.position.x - line.width / 2 &&
            pos.y < line.position.y + line.height / 2 &&
            pos.y > line.position.y - line.height / 2) {
            if (!gUser.isDrag && !gUser.isSizing) gMeme.selectedLineIdx = idx
            return true
        }
    })

}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function resetMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'TEXT',
                font: 'impact',
                size: 50,
                align: 'center',
                color: 'white',
                isStroke: false,
                position: {
                    x: 0,
                    y: 50
                }
            },
            {
                txt: 'TEXT',
                font: 'impact',
                size: 50,
                align: 'center',
                color: 'white',
                isStroke: false,
                position: {
                    x: 0,
                    y: 0
                }
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
    const line = gMeme.lines[gMeme.selectedLineIdx]
    switch (direction) {
        case 'right': line.position.x = gElCanvas.width * 0.7
            break
        case 'left': line.position.x = gElCanvas.width * 0.3
            break
        case 'center': line.position.x = gElCanvas.width * 0.5
            break
    }
}

function addLine(txt = 'TEXT') {
    const line = {
        txt,
        font: 'impact',
        size: 50,
        color: 'white',
        width: 0,
        height: 0,
        position: {
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2
        },
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
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}
