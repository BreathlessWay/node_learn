/**
 * Created by Admin on 2017/6/30.
 */
const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');
const app = require('express')();

app.get('/', (request, response) => {
  response.send('hello');
});

app.listen(8080, (err) => {
  console.log('server is running on http://localhost:8080');
});