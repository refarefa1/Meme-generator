'use strict'


function renderGallery() {
    const imgs = getImgs()
    var strHTML = imgs.map(img => {
        return `<img src="${img.url}.jpg" data-id="${img.id}">`
    })
    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}
