// TODO: Render formula according to compile output
//240,250,30,a
//260,265,20,2
var RENDER = function(ctx) {
    if (window.innerWidth < 400)
        var SIZE = 32;
    else SIZE = 64;

    try {
        var stream = getInput();
        parse(stream);
        var output = traversal(AST, X_BASE, Y_BASE, SIZE);
        show(output);

    } catch (e) {
        show(e);

    } finally {
        // reset global variables
        STACK = [[0, ""]];
        SYMBOLS = [];
        NODES = [];
        AST = {};
        OUTPUT = "";
        X_BASE = 20;
        Y_BASE = 100;
    }

    function getInput() {
        var INPUT = document.getElementById("input").value;
        var STREAM = LEXER(INPUT);
        return STREAM;
    }
    function parse(STREAM) {
        // STATE and ACTION implicitly used
        PARSE(STREAM, STACK, STATE, ACTION);
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
            ctx.font= line[2] + "px Courier New";

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
};
