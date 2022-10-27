'use strict'

var gElCanvas
var gCtx

function renderMeme() {
    const meme = getMeme()
    const user = getUser()
    const currImg = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = currImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        const lines = meme.lines
        lines.forEach(({ color, size, txt, pos, align, isStroke, font }, idx) => {
            drawText(color, size, txt, pos, align, isStroke, font)
            if (meme.selectedLineIdx === idx && !user.isSaving) drawTextRect(txt, pos)
        })
    }

}

function onDown() {

}
function onMove() {

}
function onUp() {

}

function drawText(color, size, txt, pos, align, isStroke, font) {
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.lineWidth = isStroke ? 3 : 8
    gCtx.strokeStyle = 'black'
    gCtx.lineJoin = "miter"
    gCtx.miterLimit = 2;
    gCtx.strokeText(txt, gElCanvas.width / 2, pos * gElCanvas.height)
    if (isStroke) return
    gCtx.fillText(txt, gElCanvas.width / 2, pos * gElCanvas.height)
}

function drawTextRect(txt, pos) {
    const textWidth = gCtx.measureText(txt).width
    const textHeight = gCtx.measureText(txt).fontBoundingBoxAscent + gCtx.measureText(txt).fontBoundingBoxDescent
    const startPosX = gElCanvas.width / 2 - textWidth / 2 - 20
    const startPosY = gElCanvas.height * pos - textHeight

    gCtx.strokeStyle = 'orange'
    gCtx.strokeRect(startPosX, startPosY, textWidth + 40, textHeight + 20)
}

function renderSavedMeme(idx) {
    const user = getUser()
    user.isSaving = false
    document.querySelector('.saved-memes').classList.add('hide')
    document.querySelector('.meme-editor-container').classList.remove('hide')
    setSavedMeme(idx)
    renderMeme()
}

function onSaveMeme() {
    const user = getUser()
    user.isSaving = true
    renderMeme()
    setTimeout(() => {
        const imgContent = gElCanvas.toDataURL()
        const savedMemes = saveMeme()
        const gallery = document.querySelector('.saved-gallery-container')
        const strHTML = savedMemes.map((meme, idx) => {
            if (idx < savedMemes.length - 1) return null
            return `<img onclick="renderSavedMeme(${idx})" src="${imgContent}" data-id=${meme.selectedImgId}>`
        })
        gallery.innerHTML += strHTML.join('')
        document.querySelector('.saved-memes').classList.remove('hide')
        document.querySelector('.meme-editor-container').classList.add('hide')
    }, 1)
}

function onChangeFont(font) {
    changeFont(font)
    renderMeme()
}

function onChooseEmoji(emoji) {
    chooseEmoji(emoji)
    renderMeme()
}

function onStrokeText() {
    strokeText()
    renderMeme()
}

function onDrawText(text) {
    setLineTxt(text)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    const meme = getMeme()
    if (!meme.lines.length) return
    document.querySelector('.text-input').value = meme.lines[meme.selectedLineIdx].txt
    renderMeme()
}

function onAlignText(direction) {
    alignText(direction)
    renderMeme()
}

function onAddLine() {
    const meme = getMeme()
    addLine()
    renderMeme()
    document.querySelector('.text-input').value = meme.lines[meme.selectedLineIdx].txt
}

function onSwitchLine() {
    const lineIdx = switchLine()
    const meme = getMeme()
    document.querySelector('.text-input').value = meme.lines[lineIdx].txt
    document.querySelector('.select').value = meme.lines[lineIdx].font
    renderMeme()
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
    const user = getUser()
    user.isSaving = false
    document.querySelector('.meme-editor-container').classList.remove('hide')
    document.querySelector('.main-content').classList.add('hide')
    setImg(this)
    resizeCanvas()
    addEventListener('resize', resizeCanvas);
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.meme-editor-container')
    if (window.innerWidth < 890) {
        gElCanvas.width = elContainer.offsetWidth - 50
        gElCanvas.height = elContainer.offsetWidth - 50
    } else {
        gElCanvas.width = elContainer.offsetHeight - 50
        gElCanvas.height = elContainer.offsetHeight - 50
    }
    renderMeme()
}

function onDownloadImg(elLink) {
    console.log('downloading...');
    const imgContent = gElCanvas.toDataURL()
    elLink.href = imgContent
}