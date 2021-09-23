function ajax(options) {
  options = options || {};
  options.method = (options.method || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';

  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new window.XMLHttpRequest();
  } else {
    // IE6及其以下版本浏览器
    xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
  }

  // 接收 - 第三步
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };
  // 连接 和 发送 - 第二步
  if (options.method === 'GET') {
    xhr.open('GET', options.url, true);
    xhr.send(null);
  } else if (options.method === 'POST') {
    xhr.open('POST', options.url, true);
    // 设置请求头
    if (options.headers) {
      for (const key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key]);
      }
    }
    xhr.send(options.data);
  }
}
export default ajax;
