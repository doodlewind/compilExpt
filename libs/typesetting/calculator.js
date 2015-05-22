// execute semantic action
function traversal(node, x, y, size) {
    return GRAMMAR[node.index]['calc'](node, x, y, size);
}