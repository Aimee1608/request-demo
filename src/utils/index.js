/* eslint-disable */
function getMini() {
  let mode = '';
  let isMini = false;
  let envObj = null;
  if (wx && wx.getStorageSync) {
    isMini = true;
    mode = 'wx';
    envObj = wx;
  } else if (my && my.getStorageSync) {
    isMini = true;
    mode = 'ali';
    envObj = my;
  } else if (swan && swan.getStorageSync) {
    isMini = true;
    mode = 'swan';
    envObj = swan;
  } else if (qq && qq.getStorageSync) {
    isMini = true;
    mode = 'qq';
    envObj = qq;
  } else if (tt && tt.getStorageSync) {
    isMini = true;
    mode = 'tt';
    envObj = tt;
  }

  return { mode, isMini, envObj };
}

/* eslint-disable */
function getClient(mode) {
  try {
    if (mode === 'node') {
      return 'node';
    }
    if (window && document && document.location) {
      return 'h5';
    }
    const { isMini } = getMini();
    if (isMini) {
      return 'mini';
    }

    return 'other';
  } catch (error) {
    return 'other';
  }
}

function filterUndefined(data) {
  if (!isObject(data)) {
    return data;
  }
  data = Object.assign({}, data);
  Object.keys(data).forEach(key => {
    if (data[key] === undefined) {
      delete data[key];
    } else if (data[key] === null) {
      data[key] = '';
    }
  });
  return data;
}

function buildUrl(url, query) {
  if (!url) return '';
  const params = Object.keys(query)
    .map(item => `${encodeURIComponent(item)}=${encodeURIComponent(query[item])}`)
    .join('&');
  const flag = url.indexOf('?') > -1 ? '&' : '?';
  return `${url}${flag}${params}`;
}

export {
  getMini,
  getClient,
  filterUndefined,
  buildUrl
}