var fs = require('fs');

exports.compareOutput = function (test) {
    test.expect(4);

    var files = [
        'article-en',
        'article-pl',
        'comments-en',
        'comments-pl'
    ];
    var input;
    var expected;

    for(var i in files) {
        input = fs.readFileSync('test/tmp/'+files[i]+'.json', { encoding: 'utf8' });
        expected = fs.readFileSync('test/expected/'+files[i]+'.json', { encoding: 'utf8' });

        test.equal(input, expected, "Output doesn't match expected output.");
    }

    test.done();
};