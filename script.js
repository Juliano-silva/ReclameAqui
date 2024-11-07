let currentCamera = "user";
var array = []

function switchCamera() {
    currentCamera = (currentCamera === "user") ? "environment" : "user";
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: currentCamera
        }
    })
        .then(function (stream) {
            const video = document.querySelector('video');
            video.srcObject = stream;
            video.play();
        })
        .catch(function (error) {
            console.error("Erro ao alternar câmeras: ", error);
        });
}

document.querySelector('#capture').addEventListener('click', function (e) {
    if (localStorage.Rec) {
        array = JSON.parse(localStorage.getItem("Rec"))
    }
    var canvas = document.querySelector("#canvas");
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0)
    const ImageData = canvas.toDataURL('image/png')
    array.push({
        "Title": document.getElementById("Title").value,
        "Descrição": document.getElementById("description").value,
        "Image": ImageData
    })

    localStorage.setItem("Rec", JSON.stringify(array))
})

var Conteudo = document.getElementById("Conteudo")

function Load() {
    var Buscar = JSON.parse(localStorage.getItem("Rec"))
    Buscar.forEach(element => {
        var Caixa = document.createElement("div")
        Caixa.innerHTML = `
        <h1>${element.Title}</h1>
        <p>${element.Descrição}</p>
        <img src="${element.Image}"/>
        `
        Conteudo.append(Caixa)
    });
}

Load()