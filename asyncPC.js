/**
 * Created by Admin on 2017/6/30.
 */
const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');
const app = require('express')();

app.get('/', (request, response) => {
  const baseUrl = 'https://cnodejs.org/';
  superagent
      .get('baseUrl')
      .end((err, res) => {
        const $ = cheerio.load(res.text);
        const content = [];
        $('#topic_list .topic_title').each((index, item) => {
          const json = {
            title: $(item).attr('title'),
            href: url.resolve(baseUrl, $(item).attr('href'))
          };
          content.push(json);
          response.send('content');
        });
      });
});

app.listen(8080, (err) => {
  console.log('server is running on http://localhost:8080');
});