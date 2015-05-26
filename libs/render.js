var RENDER = function(ctx) {
    var WIDTH = 500;
    var HEIGHT = 300;
    if (window.innerWidth < 500)
        var SIZE = 32;
    else SIZE = 64;

    show();
    function show() {
        ctx.canvas.width = WIDTH;
        ctx.canvas.height = HEIGHT;

        var code = document.getElementById("output").value;
        var lines = code.split('\n');

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].split(',');
            ctx.font= line[2] + "px Courier New";

            var symbol = line[3];
            ctx.fillText(symbol, line[0], HEIGHT-line[1]);
        }
    }
};