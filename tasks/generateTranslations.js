module.exports = function(grunt) {

    var path = require('path');
    var url = require('url');
    var Parser = require('../lib/Parser');
    var _ = require('lodash');
    
    grunt.registerMultiTask('generateTranslations', "Find json files, compile and save as translations data", function() {
        var done = this.async();
        
        /*var Parser = function() {
            var container = {};
            this.load = function(cfg) {
                for (var key in cfg) {
                    if (cfg.hasOwnProperty(key)) {
                        this.add(key, cfg[key]);
                    }
                }
            };
            this.add = function(key, translations) {
                container[key] = translations;
            };
            this.get = function() {
                return container;
            };
        };
        
        var Writer = function() {
            var self = this;
            this.dest;
            this.domain;
            
            var stringify = function(content) {
                if(typeof content === 'object') {
                    return JSON.stringify(content);
                } else {
                    throw new Error('Invalid content');
                }
            };
            
            var extract = function(content) {
                var result = {};
                for(var key in content) {
                    for(var lang in content[key]) {
                        if(!result[lang]) {
                            result[lang] = {};
                        }
                        if(!result[lang][self.domain]) {
                            result[lang][self.domain] = {};
                        }
                        result[lang][self.domain][key] = content[key][lang];
                    }
                }
                return result;
            };
            
            this.save = function(domain, content) {
                this.domain = domain;
                content = extract(content);
                var filePath;
                for(var lang in content) {
                    filePath = this.dest + this.domain + '-' + lang + '.json';
                    grunt.log.debug('Writing file "'+filePath + '".');
                    grunt.file.write(filePath, stringify(content[lang]));
                    grunt.log.debug('File created');
                }
            };
        };*/

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
                grunt.file.write(prefix + lang + '.json', JSON.stringify(config[lang]));
            }
            
            grunt.log.debug('Writing output...');
        });
        
        done();
    });
};