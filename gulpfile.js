const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const tap = require('gulp-tap');
const webpack = require('gulp-webpack');
const es2015 = require('babel-preset-es2015');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync')
  .create();
const fs = require('fs');
const assetRev = require('gulp-asset-rev');
const proxyMiddleware = require('http-proxy-middleware');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
//配置请求的地址
const proxyTable = {
  	// '/fourticket': {
    //        target: 'http://100jc.net/fourticket',
    //        changeOrigin: true,
    //        logLevel: 'debug'
    //    }
}

const proxyArr = [];
Object.keys(proxyTable)
  .forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = {
        target: options
      }
    }
    proxyArr.push(proxyMiddleware(context, options));
  })

gulp.task('browser-sync', ['sass', 'script','copy-resources','copy-html'],
  function() {

    browserSync.init({
      server: {
        // baseDir: '../',
        middleware: proxyArr,
      },
      // port:'3005',
      // browser: ["google chrome"], //指定打开的浏览器
      // open: true,
      // host: '192.168.199.1',
      startPath: '/dist' //打开的位置

    });

    //监听
    gulp.watch("css/**/*.scss", ['sass']);
    gulp.watch("js/**/*.js", ['script']);
    gulp.watch("resources/**/*.*", ['copy-resources']);
    gulp.watch("index.html", ['copy-html']);
  })

//拷贝js
gulp.task('copy-resources',function(){
  return gulp.src('resources/**/*.*')
  // .pipe(assetRev())
  .pipe(gulp.dest('dist/resources/'))
  .pipe(browserSync.stream());;
})
gulp.task('copy-html',function(){
  return gulp.src('index.html')
  // .pipe(assetRev())
  .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());;
})

//编译sass
gulp.task('sass', function() {
  return gulp.src("css/main.scss")
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: false
    }))
    // .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    // .pipe(assetRev())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

//监听js  解决依赖关系
gulp.task('script', function() {
  return gulp.src('./js/**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
   .pipe(webpack(
     {
       devtool: "source-map",
       entry: {
         app: './js/index.js',
       },
       output: {
         filename: 'main.js',
       },
       module:{
         loaders:[
           {
             test: /\.js$/,
             loader: 'babel-loader'
           }
         ]
       },
       plugins:[
        //  new HtmlWebpackPlugin({
        //    hash:true,//是否使用哈希
        //    template:'index.html'//模板
        //  })
       ]
     }
   ))
    // .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(assetRev())
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('default', ['browser-sync']);
