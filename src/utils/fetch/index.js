import miniRequest from './request';
import nodeRequest from './node';
import globalData from './../globalData';
import xhrRequest from './xhr';

function getRequest() {
  const client = globalData.__client__;
  if (client === 'node') {
    return nodeRequest;
  } else if (client === 'mini') {
    return miniRequest;
  } else if (client === 'h5') {
    return xhrRequest;
  } else {
    throw Error('未知');
  }
}
function get(options) {
  const request = getRequest();
  // console.log('url-----', options.url);
  request({
    url: options.url,
    method: 'GET',
    header: options.headers || {
      'content-type': 'application/json' // 默认值
    },
    dataType: options.dataType || 'json',
    success(res) {
      // console.log('res----get--success', res);
      options.success && options.success(globalData.__client__ === 'mini' ? res.data : res);
    },
    fail(err) {
      // console.log('get----fail', err);
      options.error && options.error(err);
    }
  });
};

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
function ajax(options) {
  const request = getRequest();
  options = options || {};
  options.method = (options.method || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';

  request({
    method: options.method,
    url: options.url, // 仅为示例，并非真实的接口地址
    data: options.data,
    header: options.headers || {
      'content-type': 'application/json' // 默认值
    },
    dataType: options.dataType || 'json',
    success(res) {
      options.success && options.success(globalData.__client__ === 'mini' ? res.data : res);
    },
    fail(err) {
      console.log(err);
      options.fail && options.fail(500);
    }
  });
}

export {
  get,
  ajax
};
