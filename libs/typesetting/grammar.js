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
        'action': function () {
            var bNode = NODES.pop();
            var sNode = newNode('S', '', 0);
            addChild(sNode, bNode);

            AST = sNode;
        },
        'calc': function(node, x, y, size) {
            var childB = node.children[0];
            traversal(childB, x, y, size);
            return OUTPUT;
        }
    },
    {
        'from': S['B'], 'to': [S['T'], S['B']],
        'action': function () {
            var bNode1 = NODES.pop();
            var tNode = NODES.pop();

            var bNode = newNode('B', '', 1);
            addChild(bNode, tNode);
            addChild(bNode, bNode1);

            NODES.push(bNode);
        },
        'calc': function(node, x, y, size) {
            var childT = node.children[0];
            var args = traversal(childT, x, y, size);

            var childB = node.children[1];
            args = traversal(childB, args['x'], y, size);
            return args;
        }
    },
    {
        'from': S['B'], 'to': [S['T']],
        'action': function () {
            var tNode = NODES.pop();
            var bNode = newNode('B', '', 2);
            addChild(bNode, tNode);

            NODES.push(bNode);
        },
        'calc': function(node, x, y, size) {
            var childT = node.children[0];
            return traversal(childT, x, y, size);
        }
    },
    {
        'from': S['T'], 'to': [S['R'], S['_'], S['^'], S['{'], S['B'], S['}'], S['{'], S['B'], S['}']],
        'action': function () {
            var bNode2 = NODES.pop();
            var bNode1 = NODES.pop();
            var rNode = NODES.pop();
            var tNode = newNode('T', '', 3);
            addChild(tNode, rNode);
            addChild(tNode, bNode1);
            addChild(tNode, bNode2);

            NODES.push(tNode);
        },
        'calc': function(node, x, y, size) {
            var childR = node.children[0];
            var args = traversal(childR, x, y, size);

            // handle sup arguments
            var supY = y + size * 3 / 5;
            var supSize = size * 2 / 3;
            var childB1 = node.children[1];
            var argsSup = traversal(childB1, args['x'], supY, supSize);

            // handel sub arguments
            var subY = y - size * 2 / 5;
            var subSize = size * 2 / 3;
            var childB2 = node.children[2];
            var argsSub = traversal(childB2, args['x'], subY, subSize);

            return {
                'x': Math.max(argsSup['x'], argsSub['x']),
                'y': y,
                'size': size
            }
        }
    },
    {
        'from': S['T'], 'to': [S['R'], S['^'], S['{'], S['B'], S['}']],
        'action': function () {
            var bNode = NODES.pop();
            var rNode = NODES.pop();
            var tNode = newNode('T', '', 4);
            addChild(tNode, rNode);
            addChild(tNode, bNode);

            NODES.push(tNode);
        },
        'calc': function(node, x, y, size) {
            var childR = node.children[0];
            var args = traversal(childR, x, y, size);

            // handle sup arguments
            args['y'] = y + size * 3 / 5;
            args['size'] = size * 2 / 3;;
            var childB = node.children[1];
            return traversal(childB, args['x'], args['y'], args['size']);
        }
    },
    {
        'from': S['T'], 'to': [S['R'], S['_'], S['{'], S['B'], S['}']],
        'action': function () {
            var bNode = NODES.pop();
            var rNode = NODES.pop();
            var tNode = newNode('T', '', 5);
            addChild(tNode, rNode);
            addChild(tNode, bNode);

            NODES.push(tNode);
        },
        'calc': function(node, x, y, size) {
            var childR = node.children[0];
            var args = traversal(childR, x, y, size);

            // handel sub arguments
            args['y'] = y - size * 2 / 5;
            args['size'] = size * 2 / 3;
            var childB = node.children[1];
            return traversal(childB, args['x'], args['y'], args['size']);
        }
    },
    {
        'from': S['T'], 'to': [S['R']],
        'action': function () {
            var rNode = NODES.pop();
            var tNode = newNode('T', '', 6);
            addChild(tNode, rNode);

            NODES.push(tNode);
        },
        'calc': function(node, x, y, size) {
            var childR = node.children[0];
            return traversal(childR, x, y, size);
        }
    },
    {
        'from': S['R'], 'to': [S['id']],
        'action': function () {
            var id = STACK.top(0)[1].toString();
            var rNode = newNode('R', id, 7);

            NODES.push(rNode);
        },
        'calc': function(node, x, y, size) {
            var nodeText = node.value;
            OUTPUT += newLine(x, y, size, nodeText);

            return {
                'x': x + nodeText.length * size / 2,
                'y': y,
                'size': size
            };
        }
    },
    {
        'from': S['R'], 'to': [S['num']],
        'action': function () {
            var num = STACK.top(0)[1].toString();
            var rNode = newNode('R', num, 8);

            NODES.push(rNode);
        },
        'calc': function(node, x, y, size) {
            var nodeText = node.value;
            OUTPUT += newLine(x, y, size, nodeText);

            return {
                'x': x + nodeText.length * size / 2,
                'y': y,
                'size': size
            };
        }
    },
    {
        'from': S['R'], 'to': [S['/blank']],
        'action': function () {
            var rNode = newNode('R', '', 9);
            NODES.push(rNode);
        },
        'calc': function(node, x, y, size) {
            return {
                'x': x + size / 2,
                'y': y,
                'size': size
            };
        }
    },
    {
        'from': S['R'], 'to': [S['('], S['B'], S[')']],
        'action': function () {
            var bNode = NODES.pop();
            var rNode = newNode('R', '', 10);
            addChild(rNode, bNode);

            NODES.push(rNode);
        },
        'calc': function(node, x, y, size) {
            var childB = node.children[0];

            OUTPUT += newLine(x, y, size, '(');
            var args = traversal(childB, x + size / 2, y, size);

            OUTPUT += newLine(args['x'], y, size, ')');
            return {
                'x': args['x'] + size / 2,
                'y': y,
                'size': size
            };
        }
    }
];