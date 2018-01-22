var gulp = require('gulp');
var concat = require('gulp-concat');                            //- 多个文件合并为一个；
var minifyCss = require('gulp-minify-css');                     //- 压缩CSS为一行；
var rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');               //- 路径替换
var uglify = require('gulp-uglify');                            //-压缩js
var imageMin = require('gulp-imagemin');                        //-压缩图片


gulp.task('concat', function() {                                //- 创建一个名为 concat 的 task
    gulp.src('./css/*.css')                                     //- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat('wap.min.css'))                            //- 合并后的文件名
        .pipe(minifyCss())                                      //- 压缩处理成一行
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('./css'))                               //- 输出文件本地
        //.pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev'));                              //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('wap.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
        .pipe(gulp.dest('./rev'));
});

gulp.task('image',function(){
    gulp.src('images/*.*')
        .pipe(imageMin({progressive: true}))
        .pipe(gulp.dest('dist/images'))
})

gulp.task('default', ['concat','scripts','image']);