module.exports = function stringToHash(string) {
    let i = '';
    let char = '';
    var hash = 0;

    if (string.length === 0) return hash;

    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 16) + hash) + char;
        hash = hash & hash;
    }

    return Math.abs(hash).toString(36)
    /* Cool Outputs 
        pornhub.com/hotmilfsinyourarea becomes hashj5*/
};
