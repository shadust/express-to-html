var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var router = express.Router();
var config = require('../config');
var port = config.port;
var base_url = config.base_url;

var spiderSync = async function(url,depth,cur_depth){
	console.log('depth:'+depth+' cur_depth:'+cur_depth+' url:'+url);

	const body = await new Promise(function(resolve, reject) {
				
		const options = {
	        url: url,
	        method: 'GET', 
	    };
	    request(options, function (err, res, body) {
	        if (err) {
	        	resolve(err);
	        }else {
	        	resolve(body); 	
	        }
	    })
	});
	const body_html = cheerio.load(body);
	const as = body_html('a');
	as.each(function(i, elem) {
		if(cur_depth+1<depth){
			const cur_url = body_html(this).attr('href');



			if(cur_url.startsWith('http:')||url.startsWith('https:')){
				if(cur_url.startsWith(base_url)){
					spiderSync(cur_url,depth,cur_depth+1);
				}
			}else{
				if(cur_url!='#'){
					const parts = url.split('/');
    				var new_url = '';
    				for (var i = 0; i < parts.length; i++) {
    					if(i<parts.length-1){
    						new_url+=parts[i]+'/';
    					}else{
    						new_url+=cur_url;
    					}
    				}
    				console.log(new_url);
    				spiderSync(new_url,depth,cur_depth+1);
				}
			}
		}
	});

}

router.get('/spider', function(req, res, next) {
	var out_path = './output.txt';
	var index_path = '/index.html';

	let depth = 5;
	let cur_depth = 0;

	const url = base_url+index_path;

	spiderSync(url,depth,cur_depth);
	res.render('output.art', { title: 'Do Spider Success' });
});

module.exports = router;
