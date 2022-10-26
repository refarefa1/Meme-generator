'use strict'

var gElCanvas
var gCtx

function onInit() {

    renderGallery()

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
}

function onDrawText(text) {
    setLineTxt(text)
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Arial'
    renderMeme()

}

function renderMeme() {
    const meme = getMeme()
    const text = meme.lines[0].txt
    // image
    gCtx.drawImage(meme.url, 0, 0, gElCanvas.width, gElCanvas.height)
    // text
    gCtx.fillText(text, 50, 50) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, 50, 50) // Draws (strokes) a given text at the given (x, y) position.
}

function onImgSelect() {
    setImg(this)
    renderMeme()
}

// LISTENERS

function addListeners() {
    addImgListeners()
}

function addImgListeners() {
    const imgs = document.querySelectorAll('.gallery-container img')
    imgs.forEach(img => img.addEventListener('click', onImgSelect))
}




