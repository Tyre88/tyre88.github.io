var txt = "innerText" in HTMLElement.prototype ? "innerText" : "textContent";
var arg = {
    resultFunction: function(result) {
        var aChild = document.createElement('li');
        aChild[txt] = result.format + ': ' + result.code;
        document.querySelector('body').appendChild(aChild);
    }
};
new WebCodeCamJS("canvas").init(arg).play();

var decoder = new WebCodeCamJS('#webcodecam-canvas');

var decoder = $("#webcodecam-canvas").WebCodeCamJQuery(args).data().plugin_WebCodeCamJQuery;

decoder.buildSelectMenu('#camera-select', 'environment|back').init(args);
