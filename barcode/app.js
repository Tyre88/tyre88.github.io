var txt = "innerText" in HTMLElement.prototype ? "innerText" : "textContent";
var arg = {
    resultFunction: function(result) {
        var aChild = document.createElement('li');
        aChild[txt] = result.format + ': ' + result.code;
        document.querySelector('body').appendChild(aChild);
    }
};
new WebCodeCamJS("canvas").init(arg).play();
