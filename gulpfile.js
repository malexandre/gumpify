var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    plugins = require('gulp-load-plugins')();

var sass = [
        'static/sass/*.sass'
    ],
    css = [
        'bower_components/normalize.css/normalize.css',
        'tmp/css/main.css'
    ],
    html = [
        'templates/**/*.html'
    ],
    fonts = [
        'bower_components/font-awesome/fonts/*'
    ],
    js = [
        'static/js/*.js'
    ],
    img = [
        'static/img/*'
    ];

function watcherWithCache(name, src, tasks)
{
    var watcher = gulp.watch(src, tasks);
}

gulp.task('sass', function()
{
    return gulp.src('static/sass/main.sass')
        .pipe(plugins.plumber())
        .pipe(plugins.rubySass({ loadPath: './static/sass/' }))
        .pipe(plugins.removeLines({'filters': [
            /\/\*# sourceMappingURL=/
        ]}))
        .pipe(gulp.dest('tmp/css'));
});

gulp.task('css', ['sass'], function()
{
    return gulp.src(css)
        .pipe(plugins.plumber())
        .pipe(plugins.concat('style.min.css'))
        .pipe(plugins.minifyCss({ keepSpecialComments: 0 }))
        .pipe(gulp.dest('dist/static/css'));
});

gulp.task('js', function()
{
    return gulp.src(js)
        .pipe(plugins.plumber())
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/static/js'));
});

gulp.task('html', function()
{
    return gulp.src(html)
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('fonts', function()
{
    return gulp.src(fonts)
        .pipe(gulp.dest('dist/static/fonts'));
});

gulp.task('img', function()
{
    return gulp.src(img)
        .pipe(gulp.dest('dist/static/img'));
});

gulp.task('fb-flo', function()
{
    node = spawn('node', ['flo.js'], {stdio: 'inherit'});
    node.on('close', function(code)
    {
        console.log('fb-flo exited with code status ' + code);
        if(code === 8)
        {
            console.log('Code 8 for fb-flo is an error...');
        }
    });
});

gulp.task('auto-reload', function()
{
    var p;

    gulp.watch('gulpfile.js', spawnChildren);
    spawnChildren();

    function spawnChildren(e)
    {
        // kill previous spawned process
        if(p)
        {
            p.kill();
        }

        p = spawn('gulp', ['watch'], {stdio: 'inherit'});
    }
});

gulp.task('watch', ['css', 'html', 'fonts', 'js', 'img'], function()
{
    watcherWithCache('css', sass, ['css']);
    watcherWithCache('html', html, ['html']);
    watcherWithCache('img', img, ['img']);
    watcherWithCache('fonts', fonts, ['fonts']);
    watcherWithCache('js', js, ['js']);
});

gulp.task('default', ['auto-reload', 'fb-flo']);
