var txt = "innerText" in HTMLElement.prototype ? "innerText" : "textContent";
var arg = {
    DecodeBarCodeRate: 5,
    frameRate: 15,
    tryVertical: true,
    decoderWorker: 'DecoderWorker.js',
    resultFunction: function(result) {
        var aChild = document.createElement('li');
        aChild[txt] = result.format + ': ' + result.code;
        document.querySelector('body').appendChild(aChild);
    }
};
var decoder = new WebCodeCamJS("canvas").init(arg);
function decodeLocalImage(){
    decoder.decodeLocalImage();
}