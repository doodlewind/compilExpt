// global helper functions
Array.prototype.top = function(i) {
    if (i < 0) i = -i;
    return this[this.length - 1 - i];
};
var newLine = function(x, y, size, val) {
    return [x, y, size, val].join(',') + '\n';
};
var printReduction = function (production) {
    var tmp = "";
    tmp += production['from'].str + " ->";

    for (var i = 0; i < production['to'].length; i++) {
        tmp += " " + production['to'][i].str;
    }
    console.log(tmp);
};
var newNode = function (str, value, index) {
    var node = {};
    node.str= str;
    node.value = value;
    node.index = index;
    node.children = [];
    return node;
};
var addChild = function (parent, child) {
    parent.children.push(child);
};
