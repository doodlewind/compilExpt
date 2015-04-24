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
    '\n': {
        str: '\n',
        type: 'Terminal'
    },
    'S': {
        str: 'S',
        type: 'NonTerminal'
    },
    'B': {
        str: 'B',
        type: 'NonTerminal'
    },
    'T': {
        str: 'T',
        type: 'NonTerminal'
    },
    'R': {
        str: 'R',
        type: 'NonTerminal'
    },
    '{': {
        str: '{',
        type: 'Terminal'
    },
    '}': {
        str: '}',
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
    '_': {
        str: '_',
        type: 'Terminal'
    },
    '^': {
        str: '^',
        type: 'Terminal'
    },
    'id': {
        str: 'id',
        type: 'Terminal'
    },
    'num': {
        str: 'num',
        type: 'Terminal'
    },
    '/blank': {
        str: '/blank',
        type: 'Terminal'
    },
    '$$': {
        str: '$$',
        type: 'Terminal'
    }
};
var GRAMMAR = [
    {'from': S['S'], 'to': [S['$$'],  S['B'], S['$$']]},
    {'from': S['B'], 'to': [S['T'], S['B']]},
    {'from': S['B'], 'to': [S['T']]},
    {'from': S['T'], 'to': [S['R'], S['_'], S['^'], S['{'], S['B'], S['}'], S['{'], S['B'], S['}']]},
    {'from': S['T'], 'to': [S['R'], S['^'], S['{'], S['B'], S['}']]},
    {'from': S['T'], 'to': [S['R'], S['_'], S['{'], S['B'], S['}']]},
    {'from': S['T'], 'to': [S['R']]},
    {'from': S['R'], 'to': [S['id']]},
    {'from': S['R'], 'to': [S['num']]},
    {'from': S['R'], 'to': [S['/blank']]},
    {'from': S['R'], 'to': [S['('], S['B'], S[')']]}
];