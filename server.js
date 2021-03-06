const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => {
    res.render('build/index');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});