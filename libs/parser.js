// TODO: Parse lexical elements into typesets

var PARSE = function(STREAM, STATE, STACK, ACTION) {
    var i = 0;
    while (true) {
        if (i > STREAM.length - 1) {
            console.log("Error Parsing!");
            break;
        }
        var a = STREAM[i].token;
        console.log(a);
        var s = STACK[STACK.length - 1];
        // ACTION[0][symbol] is in format ['s', 1]
        var act = ACTION[s][a][0];
        var index = ACTION[s][a][1];

        if (act === 's') {
            STACK.push(index);
            i++;
            console.log(GRAMMAR[index]);
        }
        else if (act === 'r') {
            var beta = GRAMMAR[index]['to'].length;
            var A = GRAMMAR[index]['from'].str;
            // pop chars according to value of beta
            STACK.splice(-1 * beta, beta);
            var t = STACK[STACK.length - 1];

            STACK.push(ACTION[t][A][1]);
            console.log(GRAMMAR[index]);
        }
        else if (act === 'ACC') {
            console.log(GRAMMAR[index]);
            break;
        }
        else {
            console.log("Error");
            break;
        }
    }
};
PARSE(STREAM, STATE, STACK, ACTION);