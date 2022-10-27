'use strict'

var gElCanvas
var gCtx

function renderMeme() {
    const meme = getMeme()
    const currImg = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = currImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        const lines = meme.lines
        lines.forEach(({ color, size, txt, align, isStroke, font }, idx) => {
            drawText(color, size, txt, align, isStroke, font, idx)
        })
    }

}


function drawText(color, size, txt, align, isStroke, font, idx) {
    const meme = getMeme()
    const user = getUser()
    const pos = meme.lines[idx].position
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
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
    if (meme.selectedLineIdx === idx && !user.isSaving) drawTextRect(txt, idx)
}

function drawTextRect(txt, idx) {
    const meme = getMeme()
    const pos = meme.lines[idx].position
    const textWidth = gCtx.measureText(txt).width
    const textHeight = gCtx.measureText(txt).fontBoundingBoxAscent + gCtx.measureText(txt).fontBoundingBoxDescent
    const startPosX = pos.x - textWidth / 2
    const startPosY = pos.y - textHeight / 2

    gCtx.strokeStyle = 'orange'
    gCtx.strokeRect(startPosX - 10, startPosY - 5, textWidth + 20, textHeight + 5)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setDrag()
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

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
    const user = getUser()
    user.isDrag = false
    document.body.style.cursor = 'grab'
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
    setTextLocation()
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
    setTextLocation()
    renderMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL()
        elLink.href = imgContent
}

function setTextLocation() {
    const meme = getMeme()
    const lines = meme.lines
    lines.forEach((line, idx) => {
        line.position.x = gElCanvas.width / 2
        if (idx === 1) line.position.y = gElCanvas.height - 50
    })
}