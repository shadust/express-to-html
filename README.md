# express-to-html
The simple program can convert your express web to html pages. I coded it for my friend. 

# How to use?
The program include one middleware file and two route files. 

### recorder.js
It's a middleware to record the url of your pages. You don't neet to edit 'output.txt' by your self. 
When you open a page, if the url ends with "html" or "htm", it will recode in the 'output.txt' at root path.
To use it, you follow it.

```
// app.js
...
var urlRecorder = require('./middleware/recorder'); // import it
...
var app = express();
...
app.use(urlRecorder); // add it
...
```
