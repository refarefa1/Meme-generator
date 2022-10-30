'use strict'

var gImgs = createImgs()

var gMemes

function createImgs() {
    let imgs = getMemes()
    return imgs
}

function createImg(url, keywords, id = makeId(3)) {
    return {
        id,
        url,
        keywords: [keywords]
    }
}

function getMemes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const url = JSON.parse(xhttp.responseText)
            document.querySelector('.gallery-container').innerHTML = url
            gImgs = url.data.memes
        }
    };
    xhttp.open("GET", `https://api.imgflip.com/get_memes`);
    xhttp.send();
}

