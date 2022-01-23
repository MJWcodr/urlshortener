"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringToHash(inputString) {
    let i = 0;
    let char = '';
    var hash = 0;
    if (inputString.length === 0)
        return hash;
    for (i = 0; i < inputString.length; i++) {
        char = inputString.charCodeAt(i);
        hash = ((hash << 32) + hash) + char;
        hash = hash & hash;
    }
    const out = Math.abs(hash).toString(36);
    return out.substring(0, 5);
    /* Cool Outputs
        pornhub.com/hotmilfsinyourarea becomes hashj5*/
}
exports.default = stringToHash;
