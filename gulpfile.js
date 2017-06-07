var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    pxtorem = require('postcss-pxtorem'),
    sync = require('browser-sync').create();
var processors = [
    autoprefixer, pxtorem({
        replace: false,
        propWhiteList: []
    })
];
gulp.task('html', function() {
    gulp.src('app/index.html').pipe(gulp.dest('dist')).pipe(sync.stream());
});
gulp.task('scss', function() {
    return gulp.src('app/scss/style.scss') //fichier sur lequel on lui demande de travailler
        .pipe(sass()) // appelle la librairie sass
        .pipe(gulp.dest('dist/css')) // je dis a gulp d'envoyer le fichier a ce chemin de sortie ( ici dist/css )
        .pipe(sync.stream());
});
gulp.task('watch', function() {
    gulp.watch(['./app/scss/**/*.scss'], ['scss']);
    gulp.watch(['./app/index.html'], ['html']);
});
gulp.task('sync', ['html', 'scss', 'watch'], function() {
    sync.init({
        server: __dirname + '/dist'
    });
});
gulp.task('default', ['sync'], function() {});
//////---- auto prefixer : ex avec display : flex ----------------///
gulp.task('scss', function() {
    return gulp.src('app/scss/style.scss').pipe(sass()).pipe(postcss(processors)).pipe(gulp.dest('dist/css')).pipe(sync.stream());
});
