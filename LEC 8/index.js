const express = require('express');
const app = express();
const path = require('path');


app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
//   res.json({
//     name: 'yug',
//     age: 20,
//   })
res.end('Hello World');
  
});
app.get('/watch', (req, res) => {
    let videoId = req.query.v;
    console.log(videoId);
    console.log("got it");

    res.send('id got it'+ ' ' +videoId)
});
//query params
app.get("/watch:v/video/:n", (req, res) => {
    // 2nd params
  console.log(req.params.v);
  console.log(req.params.n);   
  res.send("got it !!!!");     
});

app.listen(3000, function() {
  console.log('server started at 3000');
});