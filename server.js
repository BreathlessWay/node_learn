/**
 * Created by Admin on 2017/6/29.
 */
const app = require('express')();
const utility = require('utility');
const superagent = require('superagent');
const cheerio = require('cheerio');
app.get('/', (request, response) => {
  // console.log(request.headers);
  // const q = request.query.q;
  // const qMd5 = utility.md5(q);
  // response.send(qMd5);
  superagent.get('https://cnodejs.org/')
      .end((err, res) => {
        if (err) {
          return next(err);
        }
        const $ = cheerio.load(res.text);
        const content = [];
        $('#topic_list .topic_title').each((index, item) => {
          const json = {
            title: $(item).attr('title'),
            href: $(item).attr('href')
          };
          content.push(json);
        });
        response.send(content);
      });
});
app.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});