'use strict'

var gImgs = createImgs()

var gMemes

function createImgs() {
<<<<<<< HEAD
    let imgs = getMemes()
=======
    let imgs = []
    for (let i = 1; i < 19; i++) {
        const img = createImg(`img/memes/${i}.jpg`)
        imgs.push(img)
        // renderGallery()
    }
>>>>>>> 6b441bfdad95374270b3d692f4dd1c9841a9dd7a
    return imgs
}

function createImg(url, keywords, id = makeId(3)) {
    return {
        id,
        url,
        keywords: [keywords]
    }
}

<<<<<<< HEAD
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
=======
// function getMemes() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             const url = JSON.parse(xhttp.responseText)
//             document.querySelector('.gallery-container').innerHTML = url
//             gImgs = url.data.memes
//         }
//     };
//     xhttp.open("GET", `https://api.imgflip.com/get_memes`);
//     xhttp.send();
// }
>>>>>>> 6b441bfdad95374270b3d692f4dd1c9841a9dd7a

