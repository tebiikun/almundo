var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
  gutil  = require('gulp-util'),
	gulpSequence = require('gulp-sequence'),
	clean = require('gulp-clean'),
	cleanCSS = require('gulp-clean-css'),
	gls = require('gulp-live-server'),
	watch = require('gulp-watch'),
	htmlmin = require('gulp-htmlmin'),
	inject = require('gulp-inject'),
  imagemin = require('gulp-imagemin')


 var librariesJS = [
 	'./node_modules/angular/angular.min.js',
 	'./node_modules/angular-ui-router/release/angular-ui-router.min.js',
 	'./node_modules/bootstrap/dist/js/bootstrap.min.js',
 	'./node_modules/underscore/underscore.js',
  './node_modules/jquery/dist/jquery.min.js',
 ]

 var librariesCSS = [
 	'./node_modules/bootstrap/dist/css/bootstrap.min.css',
  './node_modules/font-awesome/css/font-awesome.min.css',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'
 ]

//****************************** IMG *****************************

gulp.task('img', function(callback) {
  gulpSequence('minify-hotels-img')(callback)
})

/*
  minify images in folder
 */
gulp.task('minify-hotels-img', function() {
  return gulp.src('source/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })

          ]))
        .pipe(gulp.dest('./public/assets/images'))
})

//****************************** JS ******************************

gulp.task('js', function(callback) {
  gulpSequence('build-js', 'minify-js')(callback)
})

/*
 Build JS folder
 */
gulp.task('build-js', function() {
  return gulp.src(librariesJS)
    .pipe(gulp.dest('./public/assets/js'))
})

/*
 Concatenate js files into main.js
 */
gulp.task('minify-js', function() {
  return gulp.src(['./source/main.js', './source/js/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(uglify()).on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('./public/assets/js'))
})


//****************************** CSS ******************************

gulp.task('css', function(callback) {
  gulpSequence('build-css', 'minify-css')(callback)
})

/*
 Build CSS folder
 */
gulp.task('build-css', function() {
  return gulp.src(librariesCSS)
    .pipe(gulp.dest('./public/assets/css'))
})

/*
 Minify CSS files
 */
gulp.task('minify-css', function() {
  return gulp.src(['./source/css/*.css'])
    .pipe(concat('main.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/assets/css'))
})

//****************************** Clean assets folder ******************************
/*
 Delete all files in assets folder.
 */
gulp.task('clean-assets', function() {
  return gulp.src(['./public/assets/css', './public/assets/js', './public/views/*.html'], {read: false})
    .pipe(clean())
})

gulp.task('clean-assets-prod', function() {
  return gulp.src(['./public/assets/css', './public/assets/js', './public/views/*.html', './public/assets/images/*'], {read: false})
    .pipe(clean())
})


//****************************** Start server ******************************
/*
 Also, live reload.
 */
gulp.task('connect', function() {
  var server = gls.new('app.js')
  server.start()

  // Backend changes
  gulp.watch(['app.js', 'app/**/*.js'], function(file) {
    server.start.bind(server)()
    setTimeout(function() {
      server.notify.bind(server)(file)
    }, 1000)
  })

  // Frontend changes
  gulp.watch(['./source/**/*'], function(file) {
    setTimeout(function() {
      server.notify.bind(server)(file)
    }, 1000)
  })
})

//****************************** HTML ******************************

gulp.task('html', function(callback) {
  gulpSequence('minify-html', 'inject')(callback)
})

/*
 Minify HTML
 */
gulp.task('minify-html', function() {
  return gulp.src(['./source/views/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public/views'))
})

/*
 Inject JS files in index file
 */
gulp.task('inject', ['copy-index-html','copy-error-html'], function() {

  var injected_files = 
  	[
    
    './public/assets/js/angular.min.js',
    './public/assets/js/angular-ui-router.min.js',
    './public/assets/js/jquery.min.js',
    './public/assets/js/bootstrap.min.js',
    
    './public/assets/js/main.js',
    './public/assets/css/*.css'
    ]

  return gulp.src(['./public/index.html','./public/error.html'])
    .pipe(inject(gulp.src(injected_files, {read: false}), {relative: true}))
    .pipe(gulp.dest('./public'))
})

gulp.task('copy-index-html', function() {
  return gulp.src('./source/index.html')
    .pipe(gulp.dest('./public'))
})

gulp.task('copy-error-html', function() {
  return gulp.src('./source/error.html')
    .pipe(gulp.dest('./public'))
})

//****************************** Watchers ******************************
/*
 If any js file changes: run clean-asset, js and inject task
 */
gulp.task('watch-files', function() {
  return gulp.watch(
    [
      './source/**/*.js',
      './source/**/*.html',
      './source/**/*.css'
    ],
    function() {
      gulpSequence('clean-assets', ['js', 'css'], 'html')(function(err) {
        if (err) console.log(err)
      })
    })
})

gulp.task('default', gulpSequence('clean-assets', ['js', 'css'], 'html', 'watch-files', 'connect'))

gulp.task('prod', gulpSequence('clean-assets-prod', ['js', 'css', 'img'], 'html', 'watch-files', 'connect'))