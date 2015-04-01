// define and wrap objects
if (true == true) {
    String.prototype.isTerminal = function () {
        var token = this;
        return token.match(/^(a|b|\+)/);
    };
    String.prototype.type = function () {
        var token = this;
        return token[0];
    };

    var clone = function(obj){
        var newObj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        } else {
            for(var i in obj){
                newObj[i] = typeof obj[i] === 'object' ?
                    clone(obj[i]) : obj[i];
            }
        }
        return newObj;
    };

    var Dot = {
        type: function() {return Dot},
        toString: function () {return "●"}
    };
    var S = {
        type: function() {return S},
        toString: function () {return "E"}
    };
    var A = {
        type: function() {return A},
        toString: function () {return "A"}
    };
    var B = {
        type: function() {return B},
        toString: function () {return "B"}
    };


    function showProduction(p) {
        var tmp = "Production: ";
        for (var i in p['to']) {
            tmp += p['to'][i].toString();
        }
        return (p['from'].toString() + "→" + tmp);
    }

    function showItem(item) {
        var tmp = "Item: ";
        for (var i in item) {
            tmp += item['rule'][i].toString();
        }
        return tmp;
    }

    function showState(state) {
        var tmp = "State: ";
        for (var i in state) {
            var item = state[i]['rule'];
            for (var j in item) {
                tmp += item[j].toString();
            }

            //show lookahead
            var lookahead = state[i]['lookahead'];
            for (var j = 0; j < lookahead.length; j++) {
                if (lookahead[j] == "\n") {
                    tmp += " \\n";
                }else tmp += " " +lookahead[j];
            }
            tmp += "  ";
        }
        return tmp;
    }
}

var r0 = {'from': S, 'to': [A]};
var r1 = {'from': A, 'to': [A, '+', B]};
var r2 = {'from': A, 'to': ['a']};
var r3 = {'from': B, 'to': ['b']};
var grammar = [r0, r1, r2, r3];
var augment = [{'rule': [S, Dot, A], 'lookahead': ['\n']}];
var symbols = [S, A, B, 'a', 'b', '+'];


var CLOSURE = (function () {
    function closure(items, grammar) {
        var J = clone(items);

        while (true) {
            var before = J.length;

            for (var i in J) {
                derive(J[i]);
            }
            var after = J.length;

            if (before == after) {
                break;
            }
        }

        return J;

        // find all productions derived from input production
        function derive(item) {
            for (var i in item['rule']) {
                // symbol = E, A, + ...
                var symbol = item['rule'][i];
                if (symbol.type() === Dot) {
                    i = parseInt(i);
                    if (i+1 in item['rule']) {
                        findStartWith(item['rule'][i+1]);
                    }
                }
            }
        }

        // find all productions in grammar begins with input symbol
        function findStartWith(symbol) {
            for (var i in grammar) {
                if (grammar[i]['from'].type() === symbol.type()) {
                    testIn(grammar[i]);
                }
            }
        }

        // test if production already in J, and add to J if not
        function testIn(production) {
            var diff = [];
            for (var i in J) {
                var tmpJ = [];
                var dotIndex;
                for (var j = 1; j < J[i]['rule'].length; j++) {
                    if (J[i]['rule'][j].type() !== Dot) {
                        tmpJ.push(J[i]['rule'][j]);
                    } else {
                        dotIndex = j;
                    }
                }
                if (tmpJ.length == production['to'].length) {
                    for (var j in tmpJ) {
                        if(tmpJ[j].type() === production['to'][j].type()) {
                            continue;
                        }
                        diff.push(false);
                    }
                }else {
                    diff.push(false);
                }
            }
            if (diff.length == J.length) {
                add(production);
            }

            // add production into J
            function add(production) {
                var tmpP = [production['from'], Dot];
                for (var i in production['to']) {
                    tmpP.push(production['to'][i]);
                }
                // TODO: Calculate lookahead set
                var tmp = {'rule': tmpP, 'lookahead': '\n'};
                //console.log(tmp);
                J.push(tmp);
            }
        }

    }
    return closure;
})();


(function() {
    // calculate FIRST set
    var F = (function(){

        function first(symbols) {
            while (true) {
                for (var i = 0; i < symbols.length; i++) {
                    if(symbols[i].isTerminal()) {
                        console.log("is!");
                    }
                }
            }
        }

        return first;
    })();

    //F(symbols);
})();

console.log(showState(CLOSURE(augment, grammar)));

var STATE = [];
var ACTION = [];
// ACTION[0] = {'a': ['s', 1], '+': ['s', 2]}...


//STATE[0] = CLOSURE(augment, grammar);
//console.log(STATE[0]);

//GOTO(STATE[0]);
//GOTO(STATE[1]);
//GOTO(STATE[2]);
//GOTO(STATE[3]);
//GOTO(STATE[4]);
//GOTO(STATE[5]);

function GOTO(state) {
    var shiftTo = [];
    var actionItem = {};

    // for every item in state, find place of Dot, then perform addIn/reduction to that item
    for (var i in state) {
        var item = state[i]['rule'];
        for (var j in item) {
            if (item[j].type() == Dot){
                j = parseInt(j);
                // judge end symbol
                if (j+1 in item) {
                    addIn(item[j+1]);
                }
                // TODO: reduction
                else {
                    actionItem['\n'] = ['r', item];
                }
            }
        }
    }

    // if symbol is new, add it into shiftTo list.
    function addIn(symbol) {
        var count = 0;
        for (var i in shiftTo) {
            if (symbol.type() !== shiftTo[i].type()) {
                count++;
            }
        }
        if (count == shiftTo.length) {
            shiftTo.push(symbol);
        }
    }

    // according to shiftTo list, add new state into STATE
    for (var i in shiftTo) {
        addState(state, shiftTo[i]);
    }

    function addState(state, symbol) {
        var newState = [];
        for (var i in state) {
            var item = state[i]['rule'];
            for (var j in item) {
                if (item[j].type() == Dot) {
                    j = parseInt(j);
                    if (j+1 in item && item[j+1].type() == symbol.type()) {
                        var newItem = clone(item);
                        var tmp;
                        tmp = newItem[j];
                        newItem[j] = newItem[j+1];
                        newItem[j+1] = tmp;

                        newState.push({'rule': newItem, 'lookahead': '\n'});
                    }
                }
            }
        }
        newState = CLOSURE(newState, grammar);
        actionItem[symbol] = ['s', STATE.length];
        STATE.push(newState);
    }
    //console.log(actionItem);
    ACTION.push(actionItem);
}
//console.log(ACTION);

