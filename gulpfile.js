const gulp = require('gulp');
const concat = require('gulp-concat');
const html = require('gulp-file-include');
const del = require('del');
const htmlbeautify = require('gulp-html-beautify');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('distDel', function () {
  del('dist');
});

/* scss TASK*/
function scss() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
}

function htmlInclude() {
  let source = 'src/html/include/*.html';
  return gulp.src(source)
    .pipe(html())
    .pipe(gulp.dest('dist/html/include'))
}

function htmlPage() {
  let source = 'src/html/*.html';
  return gulp.src(source)
    .pipe(html())
    .pipe(gulp.dest('dist/html/'))
}
function copyImg() {
  return gulp.src('src/img/**/**')
    .pipe(gulp.dest('dist/img'));
}
function copyFonts() {
  return gulp.src('src/fonts/**/**')
    .pipe(gulp.dest('dist/fonts'));
}

function jsLib() {
  let sourceLib = [
    'src/js/src/jquery.js',
    'src/js/src/bootstrap-datepicker.js',
    'src/js/src/bootstrap-datepicker.ko.min.js',
    'src/js/dist/util.js',
    'src/js/dist/tooltip.js',
    'src/js/dist/alert.js',
    'src/js/dist/button.js',
    'src/js/dist/carousel.js',
    'src/js/dist/collapse.js',
    'src/js/dist/index.js',
    'src/js/dist/modal.js',
    'src/js/dist/popover.js',
    'src/js/dist/scrollspy.js',
    'src/js/dist/tab.js',
    'src/js/dist/toast.js',
  ];
  return gulp.src(sourceLib)
    .pipe(concat('front.lib.js'))
    .pipe(gulp.dest('dist/js/lib'))
}
function jsCommon() {
  let sourceUi = ['src/js/ui/*.js'];
  // let sourceUi = ['ec/js/ui/_common.js','ec/js/ui/accodian.js','ec/js/ui/carousel.js','ec/js/ui/dialog.js','ec/js/ui/form.js','ec/js/ui/modal.js','ec/js/ui/spinner.js','ec/js/ui/tabs.js'];
  return gulp.src(sourceUi)
    .pipe(concat('front.common.js'))
    .pipe(gulp.dest('dist/js/ui'))
}

function watchScss() {
  gulp.watch('src/scss/*/*/*.scss', gulp.series(scss));
}
function watchHtml() {
  gulp.watch(['src/html/*.html'], gulp.series(htmlPage));
}
function watchInclude() {
  gulp.watch('src/html/include/*.html', gulp.series(htmlInclude, htmlPage));
}
function watchJs() {
  gulp.watch('src/js/*/*.js', gulp.series(jsLib, jsCommon));
}

function beautify() {
  var options = {
    indentSize: 4
  }
  return gulp.src('./dist/html/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./dist/html/'))
}



gulp.task("dist", gulp.series(scss, copyImg, copyFonts, jsLib, jsCommon, htmlPage, beautify));

// gulp.task("scss", scss);
// gulp.task("copyImg", copyImg);
// gulp.task("copyFonts", copyFonts);
// gulp.task("jsLib", jsLib);
// gulp.task("jsCommon", jsCommon);
// gulp.task("htmlInclude", htmlInclude);
// gulp.task("htmlPage", htmlPage);

gulp.task("watchCss", watchScss);
gulp.task("watchHtml", watchHtml);
gulp.task("watchInclude", watchInclude);
gulp.task("watchJs", watchJs);
gulp.task("test", htmlInclude);

gulp.task('htmlbeautify', htmlbeautify);
