var arg = {
    resultFunction: function(result) {
        $('body').append($('<li>' + result.format + ': ' + result.code + '</li>'));
    }
};
var decoder = $("canvas").WebCodeCamJQuery(arg).data().plugin_WebCodeCamJQuery;

function decodeLocalImage(){
    decoder.decodeLocalImage();
}

decoder.buildSelectMenu('#camera-select', 'environment|back').init(arg).play();