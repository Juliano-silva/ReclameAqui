navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: { exact: "environment" } // Para a câmera Traseira
        // facingMode: "user" // Para a câmera Frontal
    }
}).then(function (mediaStream) {
    const video = document.querySelector('#video');
    video.srcObject = mediaStream;
    video.play();
});

document.querySelector('#capture').addEventListener('click', function (e) {
    var canvas = document.querySelector("#canvas");  
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0)
})