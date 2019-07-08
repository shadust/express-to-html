[中文说明](https://www.imzcm.com/article/title/express-to-html.html)

# express-to-html
The simple program can convert your express web to html pages. I coded it for my friend. 

# How to use?
The program include one middleware file, two route files and one config file. 

### middleware/recorder.js
It's a middleware to record the url of your pages. You don't neet to edit 'output.txt' by your self. 
When you open a page, if the url ends with "html" or "htm", it will recode in the 'output.txt' at root path.

### routes/spider.js
It's a route to spide your website. 
spider pages by the url:
```
http://localhost:3000/spider
```

### routes/output.js
It's a route to create html, and copy static file to the "release" directory. 
use the url:
```
http://localhost:3000/output
```

### config.js
You can edit "config.js" if you want to change host and port.
```
const port = 3000;
const base_url = 'http://localhost:'+port;

module.exports = {port:port,base_url:base_url}
```

# Add it to your website

```
// app.js
...
var urlRecorder = require('./middleware/recorder'); // import it
var spiderRouter = require('./routes/spider'); // import it
var spiderRouter = require('./routes/spider'); // import it
...
var app = express();
...
app.use('/', outputRouter); // add it
app.use(urlRecorder); // add it
app.use('/', spiderRouter); // add it
...
```

