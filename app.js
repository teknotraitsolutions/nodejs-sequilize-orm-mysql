var express     = require("express");
var http        = require("http");
var bodyParser  = require("body-parser");
const { json } = require("body-parser");

var app = express();

app.server = http.createServer(app);
app.use(express.json({limit:'50mb'}));  // restricting data limits
app.use(express.urlencoded({limit:'50mb'})); // url encoded like image restriction

var jsonParser = bodyParser.json();

app.use(jsonParser);

const apiRoutes = require('./src/routes/index');

app.use('/api', apiRoutes); // routes that fall under /api

app.use((req,res) =>{
    res.status(404).json({
        message: `Route ${req.url} Not Found`
    })
});

app.get('/test/:id', function(req,res){
    console.log(req.params.id)
    res.send('200','Hello');
})

app.listen(9000,()=>{
    console.log("Server is running on port 9000");
})