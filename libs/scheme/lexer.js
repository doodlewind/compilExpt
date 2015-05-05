// TODO: Divide formula into lexical elements
var TEXT = '(+ 1 (* 2 (- 3 4)) 5 6 7 8)';
var LEXER = function(TEXT) {
    var text = TEXT;
    var lexOut = [];

    function nextToken() {
        var space = text.match(/^\s/);
        if (space != null) {
            // skip all space
            forward(space);
            return nextToken();
        }

        var id = text.match(/^[a-zA-Z]+[a-zA-Z0-9]*/);
        if (id != null) return {token: 'id', value: forward(id)};

        var num = text.match(/^[\d]+/);
        if (num != null) return {token: 'num', value: forward(num)};

        var lBrace = text.match(/^\(/);
        if (lBrace != null ) return {token: '(', value: forward(lBrace)};

        var rBrace = text.match(/^\)/);
        if (rBrace != null ) return {token: ')', value: forward(rBrace)};

        var opr = text.match(/^\+|\-|\*|\//);
        if (opr != null ) return {token: 'opr', value: forward(opr)};

        function forward(symbol) {
            text = text.substr(symbol[0].length, text.length);
            return symbol[0];
        }
    }
    while(text.length > 0) {
        lexOut.push(nextToken());
    }
    lexOut.push({token: '\n', value: '\n'});
    return lexOut;
};

var STREAM = LEXER(TEXT);
//console.log(STREAM);
