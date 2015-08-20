var grunt = require('grunt');
var Parser = require('../lib/Parser');

exports.parser = function (test) {
    test.expect(5);

    test.throws(function () {
            var parser = new Parser();
            parser.setLangs({
                error: 'oui oui!'
            });
        },
        Error,
        'Wrong languages');

    test.throws(function () {
            var parser = new Parser();
            parser.setLangs(123);
        },
        Error,
        'Wrong languages');
    
    test.doesNotThrow(function() {
        var parser = new Parser();
        parser.setLangs("pl");
    }, Error);
    
    var parser = new Parser();
    var translations = parser.parse(grunt.file.readYAML('test/fixture/multi.yml'), ['pl', 'en']);
    test.equal(JSON.stringify({multi: translations.pl}), grunt.file.read('test/expected/multi-pl.json'), "Output doesn't match expected output.");
    test.equal(JSON.stringify({multi: translations.en}), grunt.file.read('test/expected/multi-en.json'), "Output doesn't match expected output.");

    test.done();
};