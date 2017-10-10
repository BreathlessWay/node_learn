const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'fuck'
    });
});

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});