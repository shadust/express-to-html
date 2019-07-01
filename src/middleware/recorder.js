var fs = require('fs');
var urlrecoder = function (req, res, next) {


	var out_path = './output.txt';
	var url = req.originalUrl;

	if(url.endsWith('.html')||url.endsWith('.htm')){
		var paths = [];
		var exist = false;
		if(fs.existsSync(out_path)){
			var data = fs.readFileSync(out_path, 'utf8');
			urls = data.split('\n');
			for (var i = 0; i < urls.length; i++) {
				paths.push(urls[i]);
				if(urls[i]==url){
					exist = true;
				}
			}
		}
		if(!exist){
			paths.push(url);
		}
		paths = paths.sort();
		var content = '';
		for (var i = 0; i < paths.length; i++) {
			if(paths[i].length>0){
				content += paths[i]+'\n';
			}
		}

		fs.writeFileSync(out_path,content,'utf8');
	}
	
	
	next();
}
module.exports = urlrecoder;