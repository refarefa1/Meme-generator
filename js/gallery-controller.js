'use strict'

function renderGallery() {
    const imgs = getImgs()
    var strHTML = imgs.map((img,idx) => {
        return `
        <img src="img/memes/${idx+1}.jpg" data-id="${img.id}">
    `})
    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}