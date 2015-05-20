// global helper functions

Array.prototype.top = function(i) {
    if (i < 0) i = -i;
    return this[this.length - 1 - i];
};
var newLine = function(x, y, size, val) {
    return [x, y, size, val].join(',') + '\n';
};
var printReduction = function (production) {
    var tmp = "";
    tmp += production['from'].str + " ->";

    for (var i = 0; i < production['to'].length; i++) {
        tmp += " " + production['to'][i].str;
    }
    console.log(tmp);
};

var STACK = [[0, ""]];
var SYMBOLS = [];
var OUTPUT = "";
var X_BASE = 240;
var Y_BASE = 100;

var PARSE = function(STREAM, STACK, STATE, ACTION) {

    var baseX = 200;
    var exp, expS;
    var i = 0;
    while (true) {
        if (i > STREAM.length - 1) {
            console.log("Parsing Outbound!");
            return;
        }

        var symbol = STREAM[i];
        var a = symbol.token;

        // STACK[top] is in format [2, 'abc']
        var s = STACK.top(0)[0];

        // ACTION[0][symbol] is in format ['s', 1]
        if (ACTION[s][a] !== undefined) {
            var act = ACTION[s][a][0];
        }
        else {
            if (a === '\n')
                a = 'End Symbol($$)';
            console.log("Error on " + a + ", Abort");
            return;
        }

        var index = ACTION[s][a][1];

        if (act === 's') {
            var item = [index, symbol.value];
            STACK.push(item);
            i++;
        }
        else if (act === 'r') {
            var beta = GRAMMAR[index]['to'].length;
            var A = GRAMMAR[index]['from'].str;

            printReduction(GRAMMAR[index]);
            GRAMMAR[index]['action']();

            // pop chars according to value of beta
            STACK.splice(-1 * beta, beta);
            var t = STACK.top(0)[0];

            item = [ACTION[t][A][1], symbol.value];
            //STACK.push(ACTION[t][A][1]);
            STACK.push(item);
        }
        else if (act === 'ACC') {
            //console.log(GRAMMAR[index]);
            //eval(GRAMMAR[index]['action']);
            STACK = [[0, ""]];
            SYMBOLS = [];
            break;
        }
        else {
            console.log("Except $$ on end!");
            return;
        }
    }
};
