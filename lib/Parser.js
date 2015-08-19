var _ = require('lodash');

function Parser() {
    this.source;
    this.data = {};
    this.langs = [];

    this.filter = function (source, lang) {
        if ("object" === typeof source) {
            if(Object.keys(source).indexOf(lang) !== -1) {
                return source[lang];
            }
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    source[key] = this.filter(source[key], lang);
                }
            }
        }
        return source;
    };
}
Parser.prototype.setLangs = function(langs) {
    switch(typeof langs) {
        case 'string':
            this.langs = [langs];
            break;
        case 'object':
            if(langs.constructor === Array) {
                var unique = _.uniq(langs);
                for (var lang in unique) {
                    this.langs.push(unique[lang].toLowerCase());
                }
                break;
            }
        default:
            throw new Error('Wrong languages');
            break;
    }
};
Parser.prototype.set = function (source) {
    this.source = source;
};
Parser.prototype.get = function (lang) {
    if(lang) {
        return this.data[lang];
    }
    return this.data;
};
Parser.prototype.parse = function (source, langs) {
    if (source) {
        this.set(source);
    }
    
    if(langs) {
        this.setLangs(langs);
    }
    
    if(this.langs.length === 0) {
        throw new Error('You have to set languages, at least one');
    }
    
    for(var lang in this.langs) {
        this.data[this.langs[lang]] = this.filter(_.clone(this.source, true), this.langs[lang]);
    }

    return this.get();
};

module.exports = exports = Parser; 