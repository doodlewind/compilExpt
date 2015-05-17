// TODO: Grammar for basic scheme expressions
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
    'Exp': {
        str: 'Exp',
        type: 'NonTerminal'
    },
    'ExpS': {
        str: 'ExpS',
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
    'opr': {
        str: 'opr',
        type: 'Terminal'
    },
    //'id': {
    //    str: 'id',
    //    type: 'Terminal'
    //},
    'num': {
        str: 'num',
        type: 'Terminal'
    }
};
var GRAMMAR_COMPLEX = [
    {
        'from': S['S'],'to': [S['Exp']],
        //'action': ""
        'action': "console.log('End');"
    },
    {
        'from': S['ExpS'], 'to': [S['Exp'], S['ExpS']],
        //'action': ""
        'action': "console.log(symbol.value);"
    },
    {
        'from': S['ExpS'],'to': [S['Exp']],
        //'action': ""
        'action': "console.log(symbol.value);"
    },
    {
        'from': S['Exp'], 'to': [S['('], S['opr'], S['ExpS'], S[')']],
        //'action': ""
        'action': "console.log(symbol.value);"
    },
    //{
    //    'from': S['Exp'], 'to': [S['id']],
    //    'action': ""
    //    //'action': "console.log(STREAM[i].value);"
    //},
    {
        'from': S['Exp'], 'to': [S['num']],
        //'action': ""
        'action': "console.log(symbol.value);"
    }
];

var GRAMMAR = [
    {
        'from': S['S'],'to': [S['Exp']],
        'action': "console.log('End');"
    },
    {
        'from': S['Exp'], 'to': [S['('], S['opr'], S['Exp'], S['Exp'], S[')']],
        'action': ""
        //'action': "console.log(symbol.value);"
    },
    {
        'from': S['Exp'], 'to': [S['num']],
        'action': "console.log(symbol.value);"
    }
];