'use strict'

function onInit() {

    renderGallery()

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
}

function onChangePage(page) {
    document.querySelector('.meme-editor-container').classList.add('hide')
    if (page === 'gallery') {
        document.querySelector('.main-content').classList.remove('hide')
        document.querySelector('.saved-memes').classList.add('hide')
    } else if (page === 'memes') {
        document.querySelector('.main-content').classList.add('hide')
        document.querySelector('.saved-memes').classList.remove('hide')
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