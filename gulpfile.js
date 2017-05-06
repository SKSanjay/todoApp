var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var Server = require('karma').Server;
var exec = require('child_process').exec;

var paths = {
  scripts: ['src/core/app.js','src/*.js', 'src/*/*.js', 'src/*/*/*.js', 'src/*/*/*/*.js', 'src/*/*/*/*/*.js'],
	fonts: ['node_modules/font-awesome/fonts/fontawesome-webfont.*'],
	html: ['src/*.html', 'src/*/*.html', 'src/*/*/*.html', 'src/*/*/*/*.html', 'src/*/*/*/*/*.html'],
	css: ['src/*.css', 'src/*/*.css', 'src/*/*/*.css', 'src/*/*/*/*.css', 'src/*/*/*/*/*.css'],
	entry: ['entry.js']
};

gulp.task('server', function (cb) {
  exec('node server/index.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    //singleRun: true
  }, done).start();
});

gulp.task('browserify', function(){
	return gulp.src(paths.entry)
	.pipe(browserify({
		insertGlobals : true,
		debug : !gulp.env.production,
		transform: ['cssify']
	}))
	.pipe(rename('bundle.js'))
	.pipe(gulp.dest('./build/'));
});

// Fonts
gulp.task('fonts', function() {
	return gulp.src(paths.fonts)
	.pipe(gulp.dest('./build/fonts/'));
});

// Html
gulp.task('html', function() {
	return gulp.src(paths.html)
	.pipe(gulp.dest('./build/'))
	.pipe(livereload());
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(gulp.dest('build'))
		.pipe(livereload());
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
	.pipe(concat('build.js'))
  .pipe(gulp.dest('./build/'))
	.pipe(sourcemaps.init())
	.pipe(uglify({ mangle: false }))
	.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
	.pipe(concat('build.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/'))
		.pipe(livereload());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  livereload.listen({quiet: true, basePath:'build'});
  gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.css, ['css']);
	gulp.watch(paths.entry, ['browserify']);
	gulp.watch(paths.fonts, ['fonts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'server','fonts', 'html', 'css','scripts', 'browserify', 'test']);