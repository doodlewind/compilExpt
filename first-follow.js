String.prototype.type = function () {
    var token = this;
    var type = token.match(/^(\(|\)|\*)|([a-z]+)/);
    if (type !== null) {
        return type[0];
    }else {
        return '';
    }
};

String.prototype.type = function () {
    var token = this;
    return token[0];
};

function hasValue(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

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
    str: "●",
    type: function() {return Dot},
    toString: function () {return "●"}
};
var E = {
    str: "E",
    type: function() {return E},
    toString: function () {return "E"}
};
var T = {
    str: "T",
    type: function() {return T},
    toString: function () {return "T"}
};
var T_ = {
    str: "T_",
    type: function() {return T_},
    toString: function () {return "T_"}
};
var E_ = {
    str: "E_",
    type: function() {return E_},
    toString: function () {return "E_"}
};
var F = {
    str: "F",
    type: function() {return F},
    toString: function () {return "F"}
};
var id = {
    str: "id",
    type: function() {return id},
    toString: function () {return "id"}
};



var r0 = {'from': E, 'to': [T, E_]};
var r1 = {'from': E_, 'to': ['+', T, E_]};
var r2 = {'from': E_, 'to': ['']};
var r3 = {'from': T, 'to': [F, T_]};
var r4 = {'from': T_, 'to': ['*', F, T_]};
var r5 = {'from': T_, 'to': ['']};
var r6 = {'from': F, 'to': ['(', E, ')']};
var r7 = {'from': F, 'to': ['']};
var grammar = [r0, r1, r2, r3, r4, r5, r6, r7];
var symbols = [E, E_, T, T_, F, '(', ')', '*', 'id', ''];

//var FIRST = {
//    F: [],
//    T: [],
//    E: [],
//    E_: [],
//    T_: [],
//    '(': [],
//    ')': [],
//    '*': [],
//    'id': [],
//    '': []
//};
var FIRST = {
    F: ['(', 'id'],
    T: ['(', 'id'],
    E: ['(', 'id'],
    E_: ['+', ''],
    //T_: ['*', ''],
    T_: [],
    '(': ['('],
    ')': [')'],
    '*': [')'],
    'id': ['id'],
    '+': ['+'],
    '': ['']
};

// input an symbol array
function first(symbols) {

    // find FIRST of single symbol
    if (symbols.length === undefined || symbols.length == 1) {
        var symbol = symbols.length === undefined ? symbols : symbols[0];

        if (isTerminal(symbol)) {
            FIRST[symbol] = [symbol];
        } else {
            for (var i in grammar) {
                if (grammar[i]['from'] == symbol) {
                    // X → A B C...
                    if (grammar[i]['to'] !== '') {
                        var item = grammar[i];

                        // for all symbols in A → B C D E
                        for (var j = 0; j < item['to'].length; j++) {
                            var s = item['to'][j];
                            if (!hasValue(FIRST[s], '')) {
                                break;
                            }
                        }
                        // each of item[0] to item[j] has ɛ in FIRST
                        // their FIRST symbol should be added
                        for (var k = 0; k < j; k++) {
                             addIntoFirst(symbol, item['to'][k]);
                        }

                    } else{
                        // X → ɛ
                        FIRST[symbol].push('');
                    }
                }
            }
        }
    }

    function addIntoFirst(dest, src) {
        for (var i = 0; i < FIRST[src].length; i++) {
            if (!hasValue(FIRST[dest], FIRST[src][i])) {
                FIRST[dest].push(FIRST[src][i]);
            }
        }
    }

    function isTerminal(symbol) {
        // terminal is not instance of Object
        return !(symbol instanceof Object);
    }

    function showProduction(p) {
        var tmp = "";
        for (var i in p['to']) {
            if (p['to'][i] === '') {
                tmp += " ɛ ";
            }
            tmp += " " + p['to'][i].toString();
        }
        return (p['from'].toString() + " →" + tmp);
    }

}

first([T_]);
console.log(FIRST);