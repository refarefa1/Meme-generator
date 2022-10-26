'use strict'

var gImgs = createImgs()

var gMemes

function createImgs() {
    let imgs = []
    for (let i = 0; i < 12; i++) {
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