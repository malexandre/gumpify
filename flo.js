var flo = require('fb-flo'),
    path = require('path'),
    fs = require('fs');

var server = flo('./', {
    port: 9999,
    glob: [
    /*
      'index.html',
      'dist/static/css/style.min.css',
      'dist/static/js/app.js'
    */
        'dist/templates/*.html',
        'dist/static/css/style.min.css',
        'dist/static/js/app.js'
    ]
}, function resolver(filepath, callback)
{
    callback({
        resourceURL: '/' + filepath.replace(/dist\/(static\/)?/g, 'theme/'),
        reload: false, //path.extname(filepath) === '.html',
        contents: fs.readFileSync(filepath),
        update: function(_window, _resourceURL)
        {
            console.log("Resource " + _resourceURL + " has just been updated with new content");
        }
    });
});

server.once('ready', function()
{
    console.log('Fb-flo ready!');
});
