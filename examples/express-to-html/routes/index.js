var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index.html', function(req, res, next) {
  res.render('index.art', { articles: [
  	{
  		title:'创业公司如何选择初期员工',
  		description:'初创公司的早期员工也许不像公司创始人那样直接承担着直接的财务风险。但他们无疑也都秉持着强烈的信念，充分信任一家稚嫩的、随时都可能垮台的新公司。这些员工对全世界的初创公司和小型企业都起着至关重要的作用。',
  		createdate:'12/29/2016',
  	},
  	{
  		title:'再见2012',
  		description:'沿着这城市一起走过的每一个地方，慢慢走着，似乎在探寻三年以前关于半边身子赌注的故事，闻闻什刹海水的味道，看看古老的建筑物，还是否能找到你我爱情留下的痕迹，',
  		createdate:'12/29/2016',
  	},
  	{
  		title:'老大告诉我：佛也是要敬的！',
  		description:'如是我闻，佛在舍卫国给孤独园为三千诸天讲法，尔时，给孤独尊者即从座起，偏袒右肩，合掌向佛而...',
  		createdate:'12/29/2016',
  	},
  ]});
});
router.get('/test.html', function(req, res, next) {
  res.render('output.art', { title: 'Express' });
});
router.get('/single.html', function(req, res, next) {
  res.render('single.art', { title: 'Express' });
});
router.get('/multiple/dir/test.html', function(req, res, next) {
  res.render('output.art', { title: 'Express' });
});

module.exports = router;
