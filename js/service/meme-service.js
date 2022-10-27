'use strict'


const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


var gStartPos
var gUser = {
<<<<<<< HEAD
    isDrag: false,
=======
>>>>>>> 7001d377f469483055adc45b592cad3efb72883d
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
<<<<<<< HEAD
            isStroke: false,
            position: {
                x: 0,
                y: 50
            }
=======
            pos: 0.2,
            isStroke: false,
>>>>>>> 7001d377f469483055adc45b592cad3efb72883d
        },
        {
            txt: 'TEXT',
            font: 'impact',
            size: 50,
            align: 'center',
            color: 'white',
<<<<<<< HEAD
            isStroke: false,
            position: {
                x: 0,
                y: 0
            }
=======
            pos: 0.9,
            isStroke: false,
>>>>>>> 7001d377f469483055adc45b592cad3efb72883d
        }
    ]
}

<<<<<<< HEAD
function moveText(dx, dy) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].position.x += dx
    gMeme.lines[lineIdx].position.y += dy

}

function isTextClicked(pos) {
    const lineIdx = gMeme.selectedLineIdx
    const txt = gMeme.lines[lineIdx].txt
    const textPos = gMeme.lines[lineIdx].position
    const textWidth = gCtx.measureText(txt).width
    const textHeight = gCtx.measureText(txt).fontBoundingBoxAscent + gCtx.measureText(txt).fontBoundingBoxDescent

    if (pos.x < textPos.x + textWidth / 2 + 20 &&
        pos.x > textPos.x - textWidth / 2 - 20 &&
        pos.y < textPos.y + textHeight / 2 + 20 &&
        pos.y > textPos.y - textHeight / 2 - 20) {
        gUser.isDrag = true
        return true
    }

}

function getEvPos(ev) {

    //Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function checkIsDrag(ev) {

}

=======
>>>>>>> 7001d377f469483055adc45b592cad3efb72883d
function resetMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
<<<<<<< HEAD
=======
        url: '',
>>>>>>> 7001d377f469483055adc45b592cad3efb72883d
        lines: [
            {
                txt: 'TEXT',
                font: 'impact',
                size: 50,
                align: 'center',
                color: 'white',
<<<<<<< HEAD
                isStroke: false,
                position: {
                    x: 0,
                    y: 50
                }
=======
                pos: 0.2,
                isStroke: false
>>>>>>> 7001d377f469483055adc45b592cad3efb72883d
            },
            {
                txt: 'TEXT',
                font: 'impact',
                size: 50,
                align: 'center',
                color: 'white',
<<<<<<< HEAD
                isStroke: false,
                position: {
                    x: 0,
                    y: 0
                }
=======
                pos: 0.9,
                isStroke: false
>>>>>>> 7001d377f469483055adc45b592cad3efb72883d
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



