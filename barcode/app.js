var arg = {
    decoderWorker: 'js/DecoderWorker.js',
    DecodeBarCodeRate: 5,
    resultFunction: function(result) {
        $('body').append($('<li>' + result.format + ': ' + result.code + '</li>'));
    }
};
var decoder = $("canvas").WebCodeCamJQuery(arg).data().plugin_WebCodeCamJQuery;
decoder.buildSelectMenu("select");
decoder.play();
/*  Without visible select menu
 decoder.buildSelectMenu(document.createElement('select'), 'environment|back').init(arg).play();
 */



$('select').on('change', function(){
    decoder.stop().play();
});

$('#test').on('click', function() {
    var url = decoder.getLastImageSrc();
    decoder.decodeLocalImage(url);
});