'use strict'

var gImgs = createImgs()

var gMemes

function createImgs() {
    let imgs = []
    for (let i = 1; i < 17; i++) {
        const img = createImg(`img/memes/${i}.jpg`)
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
