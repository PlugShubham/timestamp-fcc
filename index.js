//Import express 
var express = require('express');
var app = express();

//homepage
app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

//get rule for timestamp
app.get('/:timestamp',function(req,res){
    var timestamp = req.params.timestamp;
    var patt = new RegExp("[0-9]");
    var result = patt.test(timestamp[0]);
    //check whether the timestamp is in Unix or Natural Form
    if (!result){//natural
        var unix = parseInt((new Date(timestamp).getTime() / 1000).toFixed(0));
        if(isNaN(unix)){//if timestamp is not valid return null
            const myNewTimestamp = {
                "unix":unix,
                "natural":null,
            };   
            res.end(JSON.stringify(myNewTimestamp));
        }else{//timestamp is valid
            const myNewTimestamp = {
                "unix":unix,
                "natural":timestamp
            };
            res.end(JSON.stringify(myNewTimestamp));
        }    
    }
    else{//unix
        //res.send("hello");
        var time = new Date(timestamp * 1000);
        var natural = time.toGMTString() + '\n' + time.toLocaleTimeString();
        const myNewTimestamp = {
            "unix":timestamp,
            "natural":natural,
        };   
        res.end(JSON.stringify(myNewTimestamp));
    }
})

app.listen(3000);