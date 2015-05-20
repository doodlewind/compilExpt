// TODO: Divide formula into lexical elements
var LEXER = function(text) {
    var lexOut = [];
    var matched;

    function nextToken() {
        var space = text.match(/^\s/);
        if (space != null) {
            // skip all space
            forward(space);
            return nextToken();
        }

        var id = text.match(/^[a-zA-Z\+\-\*=]+[a-zA-Z0-9\+\-\*=]*/);
        if (id != null) {
            matched = true;
            return {token: 'id', value: forward(id)};
        }

        var num = text.match(/^[\d]+/);
        if (num != null) {
            matched = true;
            return {token: 'num', value: forward(num)};
        }

        var blank = text.match(/^\/blank/);
        if (blank != null) {
            matched = true;
            return {token: '/blank', value: forward(blank)};
        }

        var caret = text.match(/^\^/);
        if (caret != null) {
            matched = true;
            return {token: '^', value: forward(caret)};
        }

        var underline = text.match(/^_/);
        if (underline != null) {
            matched = true;
            return {token: '_', value: forward(underline)};
        }

        var dollar = text.match(/^\$\$/);
        if (dollar != null) {
            matched = true;
            return {token: '$$', value: forward(dollar)};
        }

        var lBrace = text.match(/^\(/);
        if (lBrace != null ) {
            matched = true;
            return {token: '(', value: forward(lBrace)};
        }

        var rBrace = text.match(/^\)/);
        if (rBrace != null ) {
            matched = true;
            return {token: ')', value: forward(rBrace)};
        }

        var lBracket = text.match(/^\{/);
        if (lBracket != null ) {
            matched = true;
            return {token: '{', value: forward(lBracket)};
        }

        var rBracket = text.match(/^}/);
        if (rBracket != null ) {
            matched = true;
            return {token: '}', value: forward(rBracket)};
        }

        if (!matched) {

        }

        function forward(symbol) {
            text = text.substr(symbol[0].length, text.length);
            return symbol[0];
        }
    }

    while(text.length > 0) {
        matched = false;
        lexOut.push(nextToken());

        if (!matched) {
            console.log("Invalid character!");
            lexOut = [];
            break;
        }
    }
    lexOut.push({token: '\n', value: '\n'});
    return lexOut;
};