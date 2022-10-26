'use strict'

var gImgs = createImgs()

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    url:'',
    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function setLineTxt(txt){
    gMeme.lines[0].txt = txt
}

function setImg(elImg){
    gMeme.selectedImgId = elImg.dataset.id
    gMeme.url = elImg
}

function getImgs(){
    return gImgs
}

function getMeme() {
    return gMeme
}

function createImgs() {
    let imgs = []
    for (let i = 0; i < 6; i++) {
        const img = createImg(`http://127.0.0.1:5500/img/memes/${i}.jpg`)
        imgs.push(img)
    }
    return imgs
}

function createImg(url, keywords, id = makeId(3)) {
    return {
        id,
        url,
        keywords: [keywords]
    }
}