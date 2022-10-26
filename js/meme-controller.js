'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
}

function onRenderMeme() {
    const img = new Image()
    img.src = this.src
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

// LISTENERS

function addListeners() {
    addImgListeners()
}

function addImgListeners() {
    const imgs = document.querySelectorAll('.gallery-container img')
    imgs.forEach(img => img.addEventListener('click', onRenderMeme))
}


