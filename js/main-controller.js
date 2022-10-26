'use strict'

function onInit() {

    renderGallery()

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
}



function onChangePage(page) {
    if (page === 'gallery') {
        document.querySelector('.meme-editor-container').classList.add('hide')
        document.querySelector('.main-content').classList.remove('hide')
    }
    onToggleMenu()
}

function onToggleMenu() {
    document.querySelector('.menu').classList.toggle('transform-menu')
    document.querySelector('.black-screen').classList.toggle('menu-open')
}

// LISTENERS

function addListeners() {
    addImgListeners()
}

function addImgListeners() {
    const imgs = document.querySelectorAll('.gallery-container img')
    imgs.forEach(img => img.addEventListener('click', onImgSelect))
}