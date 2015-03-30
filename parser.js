/* TODO: JSON Parser */

(function () {
    String.prototype.type = function () {
        var token = this;
        if (token.match(/^[0-9]+$/)) return Number;
        else return Terminal;
    };

    function Symbol() {
        this.type = function () {
            if (this.str == '}') return Terminal;
            else return NonTerminal;
        }
    }

    /* Terminal extends Symbol */
    function Terminal(str) {
        this.str = str;
    }
    Terminal.prototype = new Symbol();
    Terminal.prototype.constructor = Terminal;


    /* NonTerminal extends Symbol */
    function NonTerminal(str) {
        this.str = str;
    }
    NonTerminal.prototype = new Symbol();
    NonTerminal.prototype.constructor = NonTerminal;
})();