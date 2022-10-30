'use strict'


function renderGallery() {
    const imgs = getImgs()
    var strHTML = imgs.map((img,idx) => {
        return `
        <img src="${img.url}" data-id="${img.id}">
    `})
    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}
