const x = document.getElementById("demo");
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
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
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
                "Image": ImageData,
                "Latitude": latitude,
                "Longetude": longitude
            })

            localStorage.setItem("Rec", JSON.stringify(array))
        })
    }
})

function initMap() {
    const location = { lat:this.id, lng: this.className }; // Example coordinates
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: location,
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}


var Conteudo = document.getElementById("Conteudo")

function Remover() {
    location.reload()
   var Rec;
   if (localStorage.getItem("Rec") == null) {
       Rec = []
   } else {
       Rec = JSON.parse(localStorage.getItem("Rec"))
   }
   Rec.splice(this.id, 1)
   localStorage.setItem("Rec", JSON.stringify(Rec))
}


function Load() {
    var Buscar = JSON.parse(localStorage.getItem("Rec"))
    Buscar.forEach(function(element,index){
        var Caixa = document.createElement("div")
        Caixa.innerHTML = `
        <h1>${element.Title}</h1>
        <p>${element.Descrição}</p>
        <img src="${element.Image}"/>
        <p>${element.Latitude}</p>
        <p>${element.Longetude}</p>
        <button id="${element.Latitude}" className="${element.Longetude}">Localizar</button>
        <button id="${index}" onclick="Remover()">Remover</button>
        `
        Conteudo.append(Caixa)
    })
}

Load()