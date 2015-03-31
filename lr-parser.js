(function () {
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

    function _Dot() {
        this.type = function() {return _Dot};
        this.toString = function() {return "●"};
    }
    _Dot.prototype.isTerminal = function() {return false};
    var Dot = new _Dot();


    function NonTerminal() {}
    NonTerminal.isTerminal = function() {return false;};

    function _S() {
        this.type = function () {return _S};
        this.toString = function () {return "S"};
        this.isTerminal = NonTerminal.isTerminal();
    }
    _S.prototype.isTerminal = NonTerminal.isTerminal;
    var S = new _S();

    function _A() {
        this.type = function () {return _A};
        this.toString = function () {return "A"};
    }
    _A.prototype.isTerminal = NonTerminal.isTerminal;
    var A = new _A();

    function _B() {
        this.type = function () {return _B};
        this.toString = function () {return "B"};
        this.isTerminal = NonTerminal.isTerminal();
    }
    _B.prototype.isTerminal = NonTerminal.isTerminal;
    var B = new _B();

    var r0 = {'from': S, 'to': [A]};
    var r1 = {'from': A, 'to': [A, '+', B]};
    var r2 = {'from': A, 'to': ['a']};
    var r3 = {'from': B, 'to': ['b']};
    var grammar = [r0, r1, r2, r3];

    //var items = [[A, Dot, A, '+', B]];
    //var items = [[A, Dot, A, '+', B],[A, A, '+', Dot, B]];
    var items = [[A, A, '+', Dot, B],[A, Dot, A, '+', B]];

    function closure(items) {
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

        for (var i in J) {
            console.log(showItem(J[i]));
        }

        // find all productions derived from input production
        function derive(item) {
            for (var i in item) {
                // symbol = S, A, + ...
                var symbol = item[i];
                if (symbol.type() === _Dot && i < item.length) {
                    i = parseInt(i);
                    findStartWith(item[i+1]);
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
                for (var j = 1; j < J[i].length; j++) {
                    if (J[i][j].type() !== _Dot) {
                        tmpJ.push(J[i][j]);
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
                J.push(tmpP);
            }
        }

        function showProduction(p) {
            var tmp = "";
            for (var i in p['to']) {
                tmp += p['to'][i].toString();
            }
            return (p['from'].toString() + "→" + tmp);
        }

        function showItem(item) {
            var tmp = "";
            for (var i in item) {
                tmp += item[i].toString();
            }
            return tmp;
        }
    }

    closure(items);

})();
