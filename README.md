# grunt-generate-translations

> Generates json files for [angular-translate](https://github.com/angular-translate/angular-translate) module.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install --save-dev kamilkisiela/grunt-generate-translations
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-generate-translations');
```

## The "generateTranslations" task

### Overview
In your project's Gruntfile, add a section named `generateTranslations` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  generateTranslation: {
    options: {
      {
        path: '...',
        langs: [...]
      }
    },
    your_target: {
      src: [...]
    },
  },
})
```

### Options

#### options.path
Type: `String`
Default value: `''`

The path to use when saving files.
 
#### options.langs
Type: `Array`

Set used languages (`['pl', 'en']`)

#### target.src
Include the given files. You can use namespace and all features from angular-translate!

### Usage Examples
Configure your task like this:

```js
grunt.initConfig({
  generateTranslations: {
    options: {
      path: 'app/translations/',
      langs: ['pl', 'en']
    },
    articles: {
      src: ['private/translations/articles/*.yml']
    },
    comments: {
      src: ['private/translations/comments/*.yaml', 'private/translations/basic/comments.yml']
    }
  }
})
```

You have now 4 files.  
Look at this pattern:  

```
path/to/save/translations/{domain}-{lang}.json
```

### Source files
This task works only with translations of a single namespace. _I will work on it later_  
__Task target name is name of our namespace!__  

### example
```yaml
title:
    pl: Witaj
    en: Welcome
subtitle:
    pl: Na naszej stronie
    en: On our website
```


### Full example
### welcome.yml
```yaml
title:
    pl: Witaj
    en: Welcome
subtitle:
    pl: Na naszej stronie
    en: On our website
```
### Gruntfile.js
```js
grunt.initConfig({
  generateTranslations: {
    options: {
      path: 'translations/',
      langs: ['pl', 'en']
    },
    welcome: {
      src: ['welcome.yml']
    }
  }
})
```
### Done!
Now, we have two files:
```
translations/welcome-pl.json
translations/welcome-en.json
```
Use them in angular-translate [see docs](http://angular-translate.github.io/docs/#/guide/12_asynchronous-loading):
```javascript
$translateProvider.useLoader('$translatePartialLoader', {
  urlTemplate: '/translations/{part}-{lang}.json'
});
```
What we have?
```javascript
app.controller('Ctrl', ['$scope', '$translate', function ($scope, $translate) {
  $translate('welcome.title').then(function (text) {
    $scope.title = text;
  });
}]);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
See [CHANGELOG.md](CHANGELOG.md).
