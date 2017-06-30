/**
 * Created by Admin on 2017/6/29.
 */
const app = require('express')();
const utility = require('utility');
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');
const Eventproxy = require('eventproxy');
const ep = new Eventproxy();
app.get('/', (request, response) => {
  // console.log(request.headers);
  // const q = request.query.q;
  // const qMd5 = utility.md5(q);
  // response.send(qMd5);
  const baseUrl = 'https://cnodejs.org/';
  superagent
      .get(baseUrl)
      .end((err, res) => {
        if (err) {
          return next(err);
        }
        const $ = cheerio.load(res.text);
        const content = [];
        $('#topic_list .topic_title').each((index, item) => {
          const json = {
            title: $(item).attr('title'),
            href: url.resolve(baseUrl, $(item).attr('href'))
          };
          content.push(json);
        });
        content.forEach(list => {
          superagent
              .get(list.href)
              .end((err, res) => {
                ep.emit('topic-list', res.text);
              });
        });
        ep.after('topic-list', content.length, (list) => {
          list = list.map(item => {
            const $ = cheerio.load(item);
            return ({
              title: $('.topic_full_title').text().trim(),
              comment1: $('.reply_content').eq(0).text().trim(),
            });
          });
          response.send(list);
        });
      });
});
app.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});