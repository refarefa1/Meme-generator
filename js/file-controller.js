'use strict'


function onDownloadImg() {
    const user = getUser()
    user.isSaving = true
    renderMeme()
    setTimeout(() => {
        let canvasImage = document.getElementById('my-canvas').toDataURL('image/png');
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
            let a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhr.response);
            a.download = 'my-meme.png';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            a.remove();
        };
        xhr.open('GET', canvasImage)
        xhr.send();
    }, 500)
    setTimeout(() => user.isSaving = false, 1000)
}

function onUploadImg(e) {
    var reader = new FileReader()
    reader.onload = function (event) {
        var img = new Image()
        showMemeEditor()
        img.onload = function () {
            resizeCanvas(img)
            setTextLocation()
            renderMeme()
        }
        img.src = event.target.result
        gElImg = img
    }
    reader.readAsDataURL(e.target.files[0]);
}

function onShareImg() {
    const elShare = document.querySelector('.share')
    elShare.href = 'whatsapp://send?text='+encodeURIComponent(gElImg.src)
}