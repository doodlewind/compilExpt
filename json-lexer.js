var LEXER = (function() {
    var lexer = {};

    lexer.parse = function(text) {
        text = "{  'glossary'  :  {  'title':'e x a m p le glossary','GlossDiv' : { 'title':'S','GlossList':{'GlossEntry':{'ID':'SGML','SortAs':'SGML','GlossTerm':'StandardGeneralizedMarkupLanguage','Acronym':'SGML','Abbrev':'ISO8879:1986','GlossDef':{'para':'Ameta-markuplanguage,usedtocreatemarkuplanguagessuchasDocBook.', 'GlossSee':'markup'}}}}}";
        var lexOut = "";

        function nextToken() {
            var space = text.match(/^\s/);
            if (space != null ) return forward(space);

            var token = text.match(/^'[^']*'/);
            if (token != null ) return forward(token);

            var colon = text.match(/^:/);
            if (colon != null ) return forward(colon);

            var comma = text.match(/^,/);
            if (comma != null ) return forward(comma);

            var lBracket = text.match(/^\{/);
            if (lBracket != null ) return forward(lBracket);

            var rBracket = text.match(/^}/);
            if (rBracket != null ) return forward(rBracket);

            function forward(symbol) {
                text = text.substr(symbol[0].length, text.length);
                return symbol[0];
            }
        }

        while(text.length > 0) {
            lexOut += nextToken();
        }
    };

    return lexer;
})();
