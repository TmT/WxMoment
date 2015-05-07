var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('build', function () {

    return gulp.src('./build/wxmoment.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});