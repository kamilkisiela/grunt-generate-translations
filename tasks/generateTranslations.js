module.exports = function(grunt) {

    var path = require('path');
    var url = require('url');
    var Parser = require('../lib/Parser');
    var _ = require('lodash');
    
    grunt.registerMultiTask('generateTranslations', "Find json files, compile and save as translations data", function() {
        var done = this.async();

        grunt.log.debug('Starting task "generateTranslations"...');
        var options = this.options({
            path: "/",
            langs: null
        });
        options.target = this.target;
        
        this.files.forEach(function(file) {
            var targetPath = grunt.config.process(options.path);
            //var writer = new Writer();
            //writer.dest = targetPath;
            
            grunt.log.debug('Handling output file "' + targetPath + options.target + '.json".');
            
            // Concatenate the source files.
            var contentSources = file.src.filter(function(filePath) {
                grunt.log.debug('Using input file "' + filePath + '".');
                // Remove nonexistent files.
                var extTest = /^ya?ml$/i; 
                if (!grunt.file.exists(filePath)) {
                    grunt.log.warn('Source file "' + filePath + '" not found.');
                    return false;
                } else if (! extTest.test(path.extname(filePath).substr(1))) {
                    grunt.log.warn('Source file "' + filePath + '" is not YAML file.');
                    return false;
                } else {
                    return true;
                }
            }).map(	function(filePath) {
                // Read and return the yaml parsed file's source.
                return grunt.file.readYAML(filePath);
            });
            
            var config = {};

            for(var cfg in contentSources) {
                var parser = new Parser();
                config = _.merge(config, parser.parse(contentSources[cfg], options.langs));
            }
            
            //writer.save(options.target, config);
            var prefix = targetPath + options.target + '-';
            for(var key in options.langs) {
                var lang = options.langs[key].toLowerCase();
                var output = {};
                output[options.target] = config[lang];
                grunt.file.write(prefix + lang + '.json', JSON.stringify(output));
            }
            
            grunt.log.debug('Writing output...');
        });
        
        done();
    });
};