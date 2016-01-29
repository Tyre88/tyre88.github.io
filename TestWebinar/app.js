(function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    var vendorUrl = window.URL || window.webkitURL;

    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    navigator.getMedia({
        video: true,
        audio: false
    }, function(stream) {
        video.src = vendorUrl.createObjectURL(stream);
        video.play();
    }, function(error) {
        console.log("error", error.code);
    });

    video.addEventListener('play', function() {
        draw(this, context, 400, 300);
    });

    function draw(video, context, width, height) {
        context.drawImage(video, 0, 0, width, height);
        setTimeout(draw, 16, video, context, width, height);
    }
}());
