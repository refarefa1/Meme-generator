'use strict'

var gElImg
var gStartPos
var gCirclePos = {}

var gElCanvas
var gCtx

function renderMeme() {
    gElCanvas.width = gElCanvas.clientWidth
    gElCanvas.height = gElCanvas.clientHeight
    const meme = getMeme()
    let img = new Image()
    img = gElImg
    if (meme.url) img.src = meme.url
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
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle';
    gCtx.lineWidth = isStroke ? 3 : 8
    gCtx.strokeStyle = 'black'
    gCtx.lineJoin = "miter"
    gCtx.miterLimit = 2;
    gCtx.font = `${size}px ${font}`
    gCtx.strokeText(txt, pos.x, pos.y)

    const textWidth = gCtx.measureText(txt).width
    const textHeight = gCtx.measureText(txt).fontBoundingBoxAscent + gCtx.measureText(txt).fontBoundingBoxDescent

    meme.lines[idx].width = textWidth + 20
    meme.lines[idx].height = textHeight + 10

    if (!isStroke) {
        gCtx.fillText(txt, pos.x, pos.y)
    }
    if (meme.selectedLineIdx === idx && user.isTextClicked && !user.isSaving ||
        meme.selectedLineIdx === idx && user.isSizingClicked) {
        drawTextRect(txt, idx, font)
    }

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

    gCtx.strokeShadow = 'black'
    gCtx.strokeStyle = 'orange'
    gCtx.lineWidth = 5
    gCtx.strokeRect(startPosX - 10, startPosY - 5, textWidth + 20, textHeight + 10)
    drawArc(startPosX + textWidth + 10, startPosY + textHeight + 5)

}

function drawArc(x, y) {
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'orange'
    gCtx.beginPath();
    gCtx.arc(x, y, 10, 0, 2 * Math.PI);
    gCtx.stroke()
    gCtx.fill();
    gCirclePos.x = x
    gCirclePos.y = y
}

function onDown(ev) {
    const pos = getEvPos(ev)
    gStartPos = pos
    if (isSizingClicked(pos)) setSizing(true)
    if (!isTextClicked(pos)) {
        document.querySelector('.text-input').value = ''
        document.querySelector('.text-input').disabled = true
        if (!isSizingClicked(pos)) gMeme.selectedLineIdx = ''
        renderMeme()
        return
    }
    setDrag(true)
    renderMeme()
}

function onMove(ev) {
    const pos = getEvPos(ev)

    if (isTextClicked(pos)) document.body.style.cursor = 'grab'
    else if (isSizingClicked(pos)) document.body.style.cursor = 'se-resize'
    else document.body.style.cursor = 'auto '

    const { isDrag, isSizing } = getUser()
    if (isDrag) {
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveText(dx, dy)
        gStartPos = pos
        renderMeme()
    }
    if (isSizing) {
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        sizeText(dx, dy)
        gStartPos = pos
        renderMeme()
    }
}

function onUp() {
    setDrag(false)
    setSizing(false)
}

function renderSavedMeme(idx) {
    const user = getUser()
    user.isSaving = false
    showMemeEditor()
    setSavedMeme(idx)
    renderMeme()
}

function renderSavedMemes() {
    const memes = loadFromStorage('savedMemesDB')
    let strHTML = memes.map((meme, idx) => {
        return `
        <section class="saved-meme">
            <img onclick="renderSavedMeme(${idx})" src="${meme.url}" data-id=${meme.selectedImgId}>
            <button onclick="onRemoveMeme(${idx})" class="remove-btn">X</button>
        </section>
        `
    })
    document.querySelector('.saved-gallery-container').innerHTML = strHTML.join('')
}

function onRemoveMeme(idx) {
    removeMeme(idx)
    renderSavedMemes()
}

function onSaveMeme() {
    const user = getUser()
    user.isSaving = true
    renderMeme()
    setTimeout(() => {
        const imgContent = gElCanvas.toDataURL()
        const savedMemes = saveMeme(gElImg)
        let strHTML = savedMemes.map((meme, idx) => {
            console.log(meme.url);
            return `
            <section class="saved-meme">
                <img onclick="renderSavedMeme(${idx})" src="${imgContent}" data-id=${meme.selectedImgId}>
                </section>
                `
            // <button onclick="onRemoveMeme(${idx})" class="remove-btn">X</button>
        })
        document.querySelector('.saved-gallery-container').innerHTML = strHTML.join('')
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
    setImg(this)
    var img = new Image()
    showMemeEditor()
    img.onload = function () {
        resizeCanvas(img)
        setTextLocation()
        renderMeme()
    }
    img.src = this.src
    gElImg = img

}

function resizeCanvas() {
    if (window.innerWidth < 1000) {
        gElCanvas.width = gElCanvas.width - 40
        gElCanvas.height = gElImg.height * gElCanvas.width / gElImg.width
    } else {
        gElCanvas.width = gElCanvas.clientWidth - 50
        gElCanvas.height = gElImg.height * gElCanvas.clientWidth / gElImg.width
    }
}

function setTextLocation() {
    const meme = getMeme()
    const lines = meme.lines
    lines.forEach((line, idx) => {
        line.position.x = gElCanvas.clientWidth / 2
        if (idx === 1) line.position.y = gElCanvas.clientHeight - 50
    })
}

function showMemeEditor() {
    document.querySelector('.saved-memes').classList.add('hide')
    document.querySelector('.main-content').classList.add('hide')
    document.querySelector('.meme-editor-container').classList.remove('hide')
}

function showSavedMemes() {
    document.querySelector('.main-content').classList.add('hide')
    document.querySelector('.meme-editor-container').classList.add('hide')
    document.querySelector('.saved-memes').classList.remove('hide')
}

function showGallery() {
    document.querySelector('.saved-memes').classList.add('hide')
    document.querySelector('.meme-editor-container').classList.add('hide')
    document.querySelector('.main-content').classList.remove('hide')

}