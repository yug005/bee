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
    res.send('id got it');
});

app.listen(3000, function() {
  console.log('server started at 3000');
});