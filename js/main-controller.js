'use strict'

function onInit() {

    renderGallery()

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
}

function onChangePage(page) {
    switch (page) {
        case 'gallery': showGallery()
            break
        case 'memes': showSavedMemes()
            break
    }
    resetMeme()
    document.querySelector('.text-input').value = ''
    onToggleMenu()
}

function onToggleMenu() {
    document.querySelector('.menu').classList.toggle('transform-menu')
    document.querySelector('.black-screen').classList.toggle('menu-open')
}

function addListeners() {
    addImgListeners()
    addMouseListeners()
    addTouchListeners()
}

function addImgListeners() {
    const imgs = document.querySelectorAll('.gallery-container img')
    imgs.forEach(img => img.addEventListener('click', onImgSelect))
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

