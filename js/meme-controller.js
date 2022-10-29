'use strict'

var gElImg

var gElCanvas
var gCtx

function renderMeme() {
    const meme = getMeme()
    let img = new Image()
    img = gElImg
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    const lines = meme.lines
    lines.forEach(({ color, size, txt, isStroke, font }, idx) => {
        drawText(color, size, txt, isStroke, font, idx)
    }
        )
}

function drawText(color, size, txt, isStroke, font, idx) {
    const meme = getMeme()
    const user = getUser()
    const pos = meme.lines[idx].position
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle';
    gCtx.textBaseline = 'middle';
    gCtx.lineWidth = isStroke ? 3 : 8
    gCtx.strokeStyle = 'black'
    gCtx.lineJoin = "miter"
    gCtx.miterLimit = 2;
    gCtx.strokeText(txt, pos.x, pos.y)
    if (!isStroke) {
        gCtx.fillText(txt, pos.x, pos.y)
    }
    if (meme.selectedLineIdx === idx && !user.isSaving) drawTextRect(txt, idx, font)

}

function drawTextRect(txt, idx, font) {
    const meme = getMeme()
    const pos = meme.lines[idx].position
    const textWidth = gCtx.measureText(txt).width
    const textHeight = gCtx.measureText(txt).fontBoundingBoxAscent + gCtx.measureText(txt).fontBoundingBoxDescent
    const startPosX = pos.x - textWidth / 2
    const startPosY = pos.y - textHeight / 2

    document.querySelector('.text-input').value = txt
    document.querySelector('.select').value = font
    document.querySelector('.text-input').disabled = EMOJIS.includes(txt) ? true : false

    gCtx.strokeStyle = 'orange'
    gCtx.strokeRect(startPosX - 10, startPosY - 5, textWidth + 20, textHeight + 5)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setDrag(true)
    renderMeme()
}

function onMove(ev) {
    const pos = getEvPos(ev)
    const { isDrag } = getUser()
    if (!isDrag) return
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    const dx = pos.x - meme.lines[lineIdx].position.x
    const dy = pos.y - meme.lines[lineIdx].position.y
    moveText(dx, dy)
    renderMeme()
}

function onUp() {
    setDrag(false)
}

function renderSavedMeme(idx) {
    const user = getUser()
    user.isSaving = false
    showMemeEditor()
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
        showSavedMemes()
    }, 1)
    setTimeout(() => user.isSaving = false, 1000)
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
    showMemeEditor()
    setImg(this)
    gElImg = this
    resizeCanvas(this)
    addEventListener('resize', resizeCanvas);
    setTextLocation()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.meme-editor-container')
    if (window.innerWidth < 1240) {

        gElCanvas.width = elContainer.offsetWidth - 40
        gElCanvas.height = gElImg.height * gElCanvas.width / gElImg.width

    } else {

        gElCanvas.width = elContainer.offsetHeight - 50
        gElCanvas.height = gElImg.height * gElCanvas.width / gElImg.width
    }
    renderMeme()
}

function setTextLocation() {
    const meme = getMeme()
    const lines = meme.lines
    lines.forEach((line, idx) => {
        line.position.x = gElCanvas.width / 2
        if (idx === 1) line.position.y = gElCanvas.height - 50
    })
}

function showMemeEditor() {
    document.querySelector('.saved-memes').classList.add('hide')
    document.querySelector('.main-content').classList.add('hide')
    document.querySelector('.meme-editor-container').classList.remove('hide')
}

function showSavedMemes() {
    document.querySelector('.saved-memes').classList.remove('hide')
    document.querySelector('.main-content').classList.add('hide')
    document.querySelector('.meme-editor-container').classList.add('hide')
}

function showGallery() {
    document.querySelector('.saved-memes').classList.add('hide')
    document.querySelector('.main-content').classList.remove('hide')
    document.querySelector('.meme-editor-container').classList.add('hide')
}