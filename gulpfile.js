const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const livereload = require('gulp-livereload')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('script', () =>
  gulp.src('src/scripts/main.js')
  .pipe(
    babel({
      presets: ['env']
    })
  )
  .pipe(
    gulp.dest('./public/assets/scripts')
  )
);

gulp.task('sass', () => (
  gulp.src('./src/scss/main.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: [
      '> 1%',
      'last 2 versions',
      'firefox >= 4',
      'safari 7',
      'safari 8',
      'IE 9',
      'IE 10',
      'IE 11'
    ],
    cascade: false
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./public/assets/styles'))
  .pipe(livereload())
))

gulp.task('default', () => {
  livereload.listen()
  gulp.watch('./src/scss/**/*.scss', ['sass'])
  gulp.watch('./src/scripts/**/*.js', ['script'])
})
