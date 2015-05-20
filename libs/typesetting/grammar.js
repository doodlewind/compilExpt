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
    {
        'from': S['S'], 'to': [S['$$'],  S['B'], S['$$']],
        'action': function () {}
    },
    {
        'from': S['B'], 'to': [S['T'], S['B']],
        'action': function () {}
    },
    {
        'from': S['B'], 'to': [S['T']],
        'action': function () {}
    },
    {
        'from': S['T'], 'to': [S['R'], S['_'], S['^'], S['{'], S['B'], S['}'], S['{'], S['B'], S['}']],
        'action': function () {
            //console.log(SYMBOLS);

            var b2 = SYMBOLS.pop().toString();
            //var X_SHIFT = b2.length * 10;

            var b1 = SYMBOLS.pop().toString();
            //X_SHIFT = b1.length * 10;

            var r = SYMBOLS.pop().toString();
            X_SHIFT = r.length * 16;

            OUTPUT += newLine(X_BASE, Y_BASE, 30, r);

            OUTPUT += newLine(X_BASE + X_SHIFT, Y_BASE + 18, 16, b1);
            OUTPUT += newLine(X_BASE + X_SHIFT, Y_BASE - 14, 16, b2);

            X_BASE += r.length * 16 + Math.max(b1.length, b2.length) * 8;
        }
    },
    {
        'from': S['T'], 'to': [S['R'], S['^'], S['{'], S['B'], S['}']],
        'action': function () {
            var b = SYMBOLS.pop().toString();
            var r = SYMBOLS.pop().toString();
            X_SHIFT = r.length * 16;

            OUTPUT += newLine(X_BASE, Y_BASE, 30, r);
            OUTPUT += newLine(X_BASE + X_SHIFT, Y_BASE + 18, 16, b);

            X_BASE += r.length * 16 + b.length * 8;
        }
    },
    {
        'from': S['T'], 'to': [S['R'], S['_'], S['{'], S['B'], S['}']],
        'action': function () {
            var b = SYMBOLS.pop().toString();
            var r = SYMBOLS.pop().toString();
            X_SHIFT = r.length * 16;

            OUTPUT += newLine(X_BASE, Y_BASE, 30, r);
            OUTPUT += newLine(X_BASE + X_SHIFT, Y_BASE - 14, 16, b);

            X_BASE += r.length * 16 + b.length * 8;
        }
    },
    {
        'from': S['T'], 'to': [S['R']],
        'action': function () {
            //var r = SYMBOLS.pop().toString();
            //X_SHIFT = r.length * 15;
            //
            //OUTPUT += newLine(X_BASE, Y_BASE, 30, r);
            //X_BASE += r.length * 15;


            //var stackOut = "";
            //for (var i = 0; i < STACK.length; i++) {
            //    stackOut += "[" + STACK[i][0] + "-" + STACK[i][1] + "] ";
            //}
            //console.log(stackOut);
            //console.log(SYMBOLS);
            //console.log("");
            //stackOut = "";
        }
    },
    {
        'from': S['R'], 'to': [S['id']],
        'action': function () {
            var id = STACK.top(0)[1];
            //console.log(STACK);
            //console.log("R->id: " + id);
            SYMBOLS.push(id);
            //OUTPUT += newLine(200, 300, 30, id);
        }
    },
    {
        'from': S['R'], 'to': [S['num']],
        'action': function () {
            var num = STACK.top(0)[1];
            //console.log("R->num: " + num);
            SYMBOLS.push(num);
        }
    },
    {
        'from': S['R'], 'to': [S['/blank']],
        'action': function () {
            X_BASE += 10;
        }
    },
    {
        'from': S['R'], 'to': [S['('], S['B'], S[')']],
        'action': function () {

        }
    }
];