var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var config = require('../config');
var port = config.port;
var base_url = config.base_url;

var copy=function(src,dst){
    let paths = fs.readdirSync(src); //同步读取当前目录
    paths.forEach(function(path){
        var _src=src+'/'+path;
        var _dst=dst+'/'+path;
        fs.stat(_src,function(err,stats){  //stats  该对象 包含文件属性
            if(err)throw err;
            if(stats.isFile()){ //如果是个文件则拷贝 
                let  readable=fs.createReadStream(_src);//创建读取流
                let  writable=fs.createWriteStream(_dst);//创建写入流
                readable.pipe(writable);
            }else if(stats.isDirectory()){ //是目录则 递归 
                checkDirectory(_src,_dst,copy);
            }
        });
    });
}
var checkDirectory=function(src,dst,callback){
    fs.access(dst, fs.constants.F_OK, (err) => {
        if(err){
            fs.mkdirSync(dst);
            callback(src,dst);
        }else{
            callback(src,dst);
        }
      });
};

/* GET home page. */
router.get('/output', function(req, res, next) {
	var out_path = './output.txt';
	
	var output_dir = './release'

	if(!fs.existsSync(output_dir)){
		fs.mkdirSync(output_dir);
	}

	copy('./public',output_dir);

	var paths = [];
	if(fs.existsSync(out_path)){
		var data = fs.readFileSync(out_path, 'utf8');
		urls = data.split('\n');
		for (var i = 0; i < urls.length; i++) {
			paths.push(urls[i]);
		}
	}
	var content = '';
	console.log(paths);
	for (var i = 0; i < paths.length; i++) {
		if(paths[i].length>0){
			const url = base_url+paths[i];
			const parts = paths[i].split('/');
			const options = {
		        url: url,
		        method: 'GET', 
		    };
		    request(options, function (err, res, body) {
	            if (err) {
	            	console.log(err)
	            }else {
	            	var cur_dir = output_dir;
	            	for (var i = 0; i < parts.length; i++) {
	            		cur_dir += '/'+parts[i];
	            		if (i<parts.length-1) {
	            			if(!fs.existsSync(cur_dir)){
								fs.mkdirSync(cur_dir);
							}
	            		}else{
	            			console.log('write:'+cur_dir)
	            			fs.writeFileSync(cur_dir,body,'utf8');
	            		}
	            	}
	            	console.log('save:'+url);
	            }
	        })
		}
	}
    res.render('output.art', { title: 'Do Output Success' });
  	
});

module.exports = router;
