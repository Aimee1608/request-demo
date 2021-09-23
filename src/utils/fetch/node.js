const https = require('https');
/**
 * Send ajax request function
 * Example: `ajax({
 *    type: 'POST',
 *    url: options.url,
 *    data: options.data,
 *    headers: options.headers
 *  });`
 * @param {Object} object to ajax request options
 */

export default (options) => {
  options = options || {};
  options.method = (options.method || 'GET').toUpperCase();
  // console.log('options-----', options);
  const getData = (res) => {
    const datas = [];
    let size = 0;
    res.on('data', function (data) {
      // console.log('-------data----');
      datas.push(data);
      size += data.length;
      // process.stdout.write(data);
    });
    res.on('end', function () {
      const buff = Buffer.concat(datas, size);
      // var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring
      const result = buff.toString();
      // console.log('-------end----', result);
      options.success && options.success(result);
      return true;
    });
  };
  if (options.method === 'GET') {
    https.get(options.url, getData).on('error', function (err) {
      // console.log('-------data----', err);
      options.fail && options.fail(err);
    });
  } else {
    const ops = new URL(options.url);
    options.headers = options.header || options.headers || {
      'content-type': 'application/json'
    };
    options.headers['Content-Length'] = Buffer.byteLength(options.data);
    options.hostname = ops.hostname;
    options.protocol = ops.protocol;
    options.port = ops.protocol === 'https:' ? 443 : 8080;
    options.path = ops.pathname;
    options.body = options.data;

    const req = https.request(options, getData);

    req.on('error', function (err) {
      console.log('---https----data----', err);
      options.fail && options.fail(err);
    });
    req.write(options.data);
    req.end();
  }
};
