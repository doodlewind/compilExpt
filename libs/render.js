// TODO: Render formula according to compile output
//240,250,30,a
//260,265,20,2
var RENDER = function(ctx) {

    var stream = getInput();
    var output = parse(stream);
    show(output);

    function getInput() {
        var INPUT = document.getElementById("input").value;
        var STREAM = LEXER(INPUT);
        return STREAM;
    }
    function parse(STREAM) {
        // STATE and ACTION implicitly used
        PARSE(STREAM, STACK, STATE, ACTION);
        return OUTPUT;
    }
    function show(OUTPUT) {
        //var lines = OUTPUT;
        //console.log(OUTPUT);
        var outputBox = document.getElementById("output");
        outputBox.value = OUTPUT;

        var lines = OUTPUT.split("\n");
        //console.log(lines);
        var WIDTH = 500;
        var HEIGHT = 200;
        ctx.canvas.width = WIDTH;
        ctx.canvas.height = HEIGHT;

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].split(',');
            ctx.font= line[2] + "px Georgia";

            var symbol = line[3];
            if (symbol === "##")
                symbol = "#";
            //if (symbol === "#sum")
            //    symbol = "∑";
            //else if (symbol === "#int")
            //    symbol = "∫";
            //else if (symbol === "##")
            //    symbol = "#";

            ctx.fillText(symbol, line[0], HEIGHT-line[1]);
        }
    }

    // reset global variables
    STACK = [[0, ""]];
    SYMBOLS = [];
    OUTPUT = "";
    X_BASE = 240;
    Y_BASE = 100;
};
