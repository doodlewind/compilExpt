// TODO: Build grammar tree explicitly

var PARSE = function(STREAM, STATE, STACK, ACTION) {
    var exp, expS;
    var i = 0;
    while (true) {
        if (i > STREAM.length - 1) {
            console.log("Parsing Outbound!");
            break;
        }
        var symbol = STREAM[i];
        var a = symbol.token;
        var s = STACK[STACK.length - 1];
        // ACTION[0][symbol] is in format ['s', 1]
        var act = ACTION[s][a][0];
        var index = ACTION[s][a][1];

        if (act === 's') {
            STACK.push(index);
            i++;
        }
        else if (act === 'r') {
            var beta = GRAMMAR[index]['to'].length;
            var A = GRAMMAR[index]['from'].str;
            // pop chars according to value of beta
            STACK.splice(-1 * beta, beta);
            var t = STACK[STACK.length - 1];

            STACK.push(ACTION[t][A][1]);

            console.log(GRAMMAR[index]);
            eval(GRAMMAR[index]['action']);
        }
        else if (act === 'ACC') {
            //console.log(GRAMMAR[index]);
            //eval(GRAMMAR[index]['action']);

            break;
        }
        else {
            console.log("Unknown Error!");
            break;
        }
    }
};
PARSE(STREAM, STATE, STACK, ACTION);