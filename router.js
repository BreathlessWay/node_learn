/**
 * Created by Admin on 2017/6/28.
 */

const router = (handle, pathname, response, postData) => {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, postData);
  } else {
    console.log('404 server' + pathname);
    response.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    response.write('404 not found');
    response.end();
  }
};

exports.router = router;