'use strict'

var gElCanvas
var gCtx

function renderMeme() {
    const meme = getMeme()
    // image
    gCtx.drawImage(meme.url, 0, 0, gElCanvas.width, gElCanvas.height)
    // text
    const lines = meme.lines

    lines.forEach(({ color, size, txt, pos, align }) => {
        gCtx.fillStyle = color
        gCtx.font = `${size}px impact`
        gCtx.fillText(txt, gElCanvas.width / 2, pos * gElCanvas.height) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(txt, gElCanvas.width / 2, pos * gElCanvas.height) // Draws (fills) a given text at the given (x, y) position.
        gCtx.textAlign = align
    })

}

function onDrawText(text) {
    setLineTxt(text)
    gCtx.strokeWidth = 1
    gCtx.strokeStyle = 'black'
    renderMeme()

}

function onSwitchLine() {
    const lineIdx = switchLine()
    const meme = getMeme()
    document.querySelector('.text-input').value = meme.lines[lineIdx].txt
}

function onChangeSize(size) {
    changeSize(size)
    renderMeme()
}

function onChangeColor(color) {
    changeColor(color)
    renderMeme()
}

function onImgSelect() {
    document.querySelector('.meme-editor-container').classList.remove('hide')
    document.querySelector('.main-content').classList.add('hide')
    setImg(this)
    renderMeme()
}

