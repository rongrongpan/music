var gulp = require('gulp');
var imagemin = require('gulp-imagemin');//压缩图片
var newer = require('gulp-newer');//监听图片是否已经被压缩
var htmlClean = require('gulp-htmlclean');//压缩html代码
var uglify = require('gulp-uglify');//压缩js代码
var strip = require('gulp-strip-debug');//清除调试代码
var concat = require('gulp-concat');//合并js文件
var less = require('gulp-less');//将less转为css
var postcss = require('gulp-postcss');//可以进行自动添加前缀、压缩代码
var autoprefixer = require('autoprefixer');//添加前缀
var cssnano = require('cssnano');//压缩css代码
var connect = require('gulp-connect');//模拟服务器
var devMode = process.env.NODE_ENV == 'development';
// var devMode =true;
// console.log(process.env.NODE_ENV);


var floder = {
	src: './src/',
	build: './build/'
}

//流读取文件
gulp.task('images',function(){
	var page = gulp.src(floder.src + 'images/*')
	if(!devMode){
		page.pipe(imagemin())

	}
		page.pipe(newer(floder.build + 'images/'))
		.pipe(connect.reload())
		.pipe(gulp.dest(floder.build + 'images/'))
})

gulp.task('html',function(){
	var page = gulp.src(floder.src + 'html/*')
		if(!devMode){
			page.pipe(htmlClean())
		}
		page.pipe(connect.reload())
		.pipe(gulp.dest(floder.build + 'html/'))
})

gulp.task('js',function(){
	var page = gulp.src(floder.src + 'js/*')
	if(!devMode){
		page.pipe(uglify())
		.pipe(strip())
	}
		
		// .pipe(concat('commons.js'))
		page.pipe(connect.reload())   //文件内容改变时自动刷新
		.pipe(gulp.dest(floder.build + 'js/'))

})

gulp.task('css',function(){
	var options = [autoprefixer(),cssnano()];
	var page = gulp.src(floder.src + 'css/*')
	    .pipe(less())
	if(!devMode){	
		page.pipe(postcss(options))
	}
		page.pipe(connect.reload())
		.pipe(gulp.dest(floder.build + 'css/'))
})

gulp.task('watch',function(){
	gulp.watch(floder.src + 'css/*',['css']);
	gulp.watch(floder.src + 'html/*',['html']);
	gulp.watch(floder.src + 'js/*',['js']);
	gulp.watch(floder.src + 'images/*',['images']);

})

// gulp.task('html',['images'],function(){    //images是html执行的依赖
// 	gulp.src(floder.src + 'html/*')
// 		.pipe(htmlClean())
// 		.pipe(gulp.dest(floder.build + 'html'))
// })

gulp.task('server',function(){
	connect.server({
		port:'8081',		//更改端口号
		livereload: true   //浏览器自动刷新页面
	})
})

gulp.task('default',['images','html','js','css','watch','server'])