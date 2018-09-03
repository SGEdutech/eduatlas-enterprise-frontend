const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');

gulp.task('styles', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass()
			.on('error', sass.logError))
		.pipe(gulp.dest('./css/'));
});

gulp.task('templates', function(){
    gulp.src('templates/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'template',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('default', function () {
	gulp.watch('./sass/**/*.scss', ['styles']);
});
