// TODO: Render formula according to compile output
//240,250,30,a
//260,265,20,2
var RENDER = (function(ctx, typeset) {
    var lines = typeset.split("\n");
    var WIDTH = 500, HEIGHT = 500;
    ctx.canvas.width = WIDTH;
    ctx.canvas.height = HEIGHT;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].split(',');
        ctx.font= line[2] + "px Georgia";

        var symbol = line[3];
        if (symbol === "#sum")
            symbol = "∑";
        else if (symbol === "#int")
            symbol = "∫";
        else if (symbol === "##")
            symbol = "#";

        ctx.fillText(symbol, line[0], HEIGHT-line[1]);
    }
});
