var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');


var app={
	srcPath:"src/",     /*源码目录*/
	devPath:"build/",   /*开发环境目录*/
	prdPath:"dist/" 	/*生产环境目录*/
};

//lib  angular
gulp.task('lib',function(){
	gulp.src('lib/**/*.js')
	.pipe(gulp.dest(app.devPath+'lib'))
	.pipe(gulp.dest(app.prdPath+'lib'))
});
//js
gulp.task('js',function(){
	gulp.src('src/js/**/*.js')
	.pipe(gulp.dest(app.devPath+'js'))
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath+'js'))
});
//css
gulp.task('less',function(){
	gulp.src('src/less/**/*.less')
	.pipe($.less())
	.pipe(gulp.dest(app.devPath+'css'))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath+'css'))
});
//html
gulp.task('html',function(){
	gulp.src(app.srcPath+'**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
});
//image
gulp.task('image',function(){
	gulp.src('src/image/**/*')
	.pipe($.imagemin())
	.pipe(gulp.dest(app.devPath+'image'))
	.pipe(gulp.dest(app.prdPath+'image'))
});
//watch
gulp.task('watch',function(){
	gulp.watch('lib/**/*.js',['lib']);
	gulp.watch('src/js/**/*.js',['js']);
	gulp.watch('src/less/**/*.less',['less']);
	gulp.watch('src/view/**/*.html',['html']);
	gulp.watch('src/image/**/*',['image']);
});

//clean
gulp.task('clean',function(){
	gulp.src([app.devPath,app.prdPath])
	.pipe($.clean())
});

//default
gulp.task('default',['watch']);

//build
gulp.task('build',['lib','js','less','image','html'])
