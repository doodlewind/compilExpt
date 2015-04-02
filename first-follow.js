function hasValue(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

// symbols list
var S = {
    'E': {
        str: 'E',
        type: 'NonTerminal'
    },
    'E_': {
        str: 'E_',
        type: 'NonTerminal'
    },
    'T': {
        str: 'T',
        type: 'NonTerminal'
    },
    'T_': {
        str: 'T_',
        type: 'NonTerminal'
    },
    'F': {
        str: 'F',
        type: 'NonTerminal'
    },
    'id': {
        str: 'id',
        type: 'Terminal'
    },
    '*': {
        str: '*',
        type: 'Terminal'
    },
    '+': {
        str: '+',
        type: 'Terminal'
    },
    '(': {
        str: '(',
        type: 'Terminal'
    },
    ')': {
        str: ')',
        type: 'Terminal'
    },
    '': {
        str: '',
        type: 'Terminal'
    },
    '\n': {
        str: '\n',
        type: 'Terminal'
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
var FOLLOW = {
    //'E': [S[')'], S['\n']],
    //'E_': [S[')'], S['\n']],
    //'T': [S['+'], S[')'], S['\n']],
    //'T_': [S['+'], S[')'], S['\n']],
    //'F': [S['+'], S['*'], S[')'], S['\n']],
    'E': [],
    'E_': [],
    'T': [],
    'T_': [],
    'F': []
};

//correct FIRST set
//var FIRST = {
//    'F': [S['('], S['id']],
//    'T': [S['('], S['id']],
//    'E': [S['('], S['id']],
//    'E_': [S['+'], S['']],
//    'T_': [S['*'], S['']],
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
            // avoid adding end symbol into FIRST table
            if (s !== '\n' && buildFirst(S[s])) {
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
                            addToFirst(item['to'][0].str, symbol.str);
                        }
                        else {
                            for (var k = 0; k < j; k++) {
                                addToFirst(item['to'][k].str, symbol.str);
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
        function addToFirst(src, dest) {
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

function buildFollowTable() {
    while (true) {
        var changed = false;
        var count = 0;
        for (var s in S) {
            // avoid adding Terminal into FOLLOW table
            count++;
            if (S[s].type === 'NonTerminal' && buildFollow(S[s])) {
                changed = true;
            }
        }
        if (changed === false) break;
    }
    // input a symbol like S['X']
    //buildFollow(S['E_']);
    function buildFollow() {
        var changed = false;
        // for all NonTerminal, add $ to its FOLLOW
        if (!hasValue(FOLLOW[GRAMMAR[0]['from'].str], S['\n'])) {
            changed = true;
            FOLLOW[GRAMMAR[0]['from'].str].push(S['\n']);
        }

        for (var i in GRAMMAR) {
            var rule = GRAMMAR[i]['to'];
            var j = rule.length - 1;

            // if A → α...B
            // add FOLLOW(A) to FOLLOW(B)
            if (rule[j].type === 'NonTerminal') {
                addFollowToFollow(GRAMMAR[i]['from'].str, rule[rule.length - 1].str);
            }

            // if A → B C D E F, then FOLLOW(E)←FIRST(F), FOLLOW(D)←FIRST(E)...
            for (; j > 0; j--) {
                if (rule[j-1].type === 'NonTerminal') {
                    addFirstToFollow(rule[j].str, rule[j-1].str);
                }
            }
            //addFirstToFollow(rule[0].str, GRAMMAR[i]['from'].str);
        }

        // if A → B C D E F G and D E F G have epsilon in their FIRST
        // add FOLLOW(A) to FOLLOW(C D E F G)
        for (var k in GRAMMAR) {
            rule = GRAMMAR[k]['to'];
            for (j = rule.length - 1; j > 0; j--) {
                if (!hasValue(FIRST[rule[j].str], S[''])) break;
            }
            //console.log("Test: " + GRAMMAR[k]['from'].str + " to " + GRAMMAR[k]['to'][j].str);
            // BUG HERE! For {E → T E_} no adding E to T performed!
            for (; j < rule.length; j++) {
                if (rule[j].type === 'NonTerminal') {
                    //console.log(GRAMMAR[k]['from'].str + ", " + rule[j].str + " added\n");
                    addFollowToFollow(GRAMMAR[k]['from'].str, rule[j].str);
                }
            }
        }

        return changed;

        // src and dest are in 'X' format, not S['X']
        function addFirstToFollow(src, dest) {
            for (var i = 0; i < FIRST[src].length; i++) {
                if (!hasValue(FOLLOW[dest], FIRST[src][i]) && FIRST[src][i] !== S['']) {
                    changed = true;
                    //console.log("change: addFirstToFollow");
                    FOLLOW[dest].push(FIRST[src][i]);
                }
            }
        }

        // src and dest are in 'X' format, not S['X']
        function addFollowToFollow(src, dest) {
            for (var i = 0; i < FOLLOW[src].length; i++) {
                if (!hasValue(FOLLOW[dest], FOLLOW[src][i]) && FOLLOW[src][i] !== S['']) {
                    changed = true;
                    //console.log("change: addFollowToFollow");
                    FOLLOW[dest].push(FOLLOW[src][i]);
                }
            }
        }
    }
}

buildFirstTable();
buildFollowTable();
console.log(FOLLOW);