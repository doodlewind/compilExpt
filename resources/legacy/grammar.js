// TODO: Grammar for basic formulas
var S = {
    'ACC': {
        str: 'ACC',
        type: 'ACC'
    },
    '●': {
        str: '●',
        type: '●'
    },
    'E': {
        str: 'E',
        type: 'NonTerminal'
    },
    'T': {
        str: 'T',
        type: 'NonTerminal'
    },
    'F': {
        str: 'F',
        type: 'NonTerminal'
    },
    '(': {
        str: '(',
        type: 'Terminal'
    },
    ')': {
        str: ')',
        type: 'Terminal'
    },
    '+': {
        str: '+',
        type: 'Terminal'
    },
    '*': {
        str: '*',
        type: 'Terminal'
    },
    'id': {
        str: 'id',
        type: 'Terminal'
    },
    '\n': {
        str: '\n',
        type: 'Terminal'
    }
};
var r1 = {'from': S['E'], 'to': [S['E'],  S['+'], S['T']]};
var r2 = {'from': S['E'], 'to': [S['T']]};
var r3 = {'from': S['T'], 'to': [S['T'], S['*'], S['F']]};
var r4 = {'from': S['T'], 'to': [S['F']]};
var r5 = {'from': S['F'], 'to': [S['('], S['E'], S[')']]};
var r6 = {'from': S['F'], 'to': [S['id']]};
var GRAMMAR = [
    r1, r2, r3, r4, r5, r6
];
