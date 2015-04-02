function hasValue(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

// symbols list
var S = {
    'E': {
        type: 'NonTerminal',
        str: 'E'
    },
    'E_': {
        type: 'NonTerminal',
        str: 'E_'
    },
    'T': {
        type: 'NonTerminal',
        str: 'T'
    },
    'T_': {
        type: 'NonTerminal',
        str: 'T_'
    },
    'F': {
        type: 'NonTerminal',
        str: 'F'
    },
    'id': {
        type: 'Terminal',
        str: 'id'
    },
    '*': {
        type: 'Terminal',
        str: '*'
    },
    '+': {
        type: 'Terminal',
        str: '+'
    },
    '(': {
        type: 'Terminal',
        str: '('
    },
    ')': {
        type: 'Terminal',
        str: ')'
    },
    '': {
        type: 'Terminal',
        str: ''
    }
};


var r0 = {'from': S['E'], 'to': [S['T'], S['E_']]};
var r1 = {'from': S['E_'], 'to': [S['+'], S['T'], S['E_']]};
var r2 = {'from': S['E_'], 'to': [S['']]};
var r3 = {'from': S['T'], 'to': [S['F'], S['T_']]};
var r4 = {'from': S['T_'], 'to': [S['*'], S['F'], S['T_']]};
var r5 = {'from': S['T_'], 'to': [S['']]};
var r6 = {'from': S['F'], 'to': [S['('], S['E'], S[')']]};
var r7 = {'from': S['F'], 'to': [S['id']]};
var GRAMMAR = [r0, r1, r2, r3, r4, r5, r6, r7];

var FIRST = {'F': [], 'T': [], 'E': [], 'E_': [], 'T_': [], '(': [], ')': [], '*': [], id: [], '+': [], '': []};
var FOLLOW = {'F': [], 'T': [], 'E': [], 'E_': [], 'T_': [], '(': [], ')': [], '*': [], id: [], '+': [], '': []};

//correct FIRST set
//var FIRST = {
//    'F': [S['('], S['id']],
//    'T': [S['('], S['id']],
//    'E': [S['('], S['id']],
//    'E_': [S['+'], S['']],
//    //T_: ['*', ''],
//    //F: [],
//    //T: [],
//    //E: [],
//    //E_: [],
//    'T_': [],
//    '(': [S['(']],
//    ')': [S[')']],
//    '*': [S['*']],
//    'id': [S['id']],
//    '+': [S['+']],
//    '': [S['']]
//};



// run for once, build FIRST set for all symbols
function buildFirstTable() {
    while (true) {
        var changed = false;
        for (var s in S) {
            //console.log("calculate first: " + s);
            if (buildFirst(S[s])) {
                changed = true;
            }
        }
        //console.log("\n");
        if (changed == false) break;
    }

    // input an symbol S['X']
    // modify its FIRST set according to current FIRST table
    function buildFirst(symbol) {
        var changed = false;

        // FIRST of terminal is itself
        if (isTerminal(symbol)) {
            //console.log("change symbol is Terminal");
            if (!hasValue(FIRST[symbol.str], symbol)) {
                changed = true;
                FIRST[symbol.str] = [symbol];
            }
        }
        // to Non-Terminal, apply rules
        else {
            for (var i in GRAMMAR) {
                if (GRAMMAR[i]['from'] == symbol) {
                    // X → A B C...
                    if (GRAMMAR[i]['to'] !== '') {
                        var item = GRAMMAR[i];

                        // for all symbols in A → B C D E
                        for (var j = 0; j < item['to'].length; j++) {

                            var s = item['to'][j];
                            // S[''] stands for epsilon
                            if (!hasValue(FIRST[s.str], S[''])) {
                                break;
                            }
                        }
                        // each of item[0] to item[j] has ɛ in FIRST
                        // their FIRST symbol should be added
                        if (j == 0) {
                            addIntoFirst(symbol.str, item['to'][0].str);
                        }
                        else {
                            for (var k = 0; k < j; k++) {
                                addIntoFirst(symbol.str, item['to'][k].str);
                            }
                        }

                    } else{
                        // X → ɛ
                        // add in epsilon
                        // console.log("change X to epsilon");
                        if (!hasValue(FIRST[symbol.str])) {
                            changed = true;
                            FIRST[symbol.str].push(S['']);
                        }
                    }
                }
            }
        }
        return changed;

        // dest and src are in 'X' format (not S['X'])
        function addIntoFirst(dest, src) {
            for (var i = 0; i < FIRST[src].length; i++) {
                if (!hasValue(FIRST[dest], FIRST[src][i])) {
                    changed = true;
                    //console.log("change: addIntoFIRST");
                    FIRST[dest].push(FIRST[src][i]);
                }
            }
        }

        function isTerminal(symbol) {
            return symbol.type === 'Terminal';
        }
    }
}



buildFirstTable();
//console.log(FIRST['T']);