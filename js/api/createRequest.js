/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}, callback) => {
  let formData;

  let xhr = new XMLHttpRequest();
  let response;
  let err;
  
  xhr.responseType = options.responseType;
  if (options.hasOwnProperty("headers")) {
    for (let key in options.headers) {
      xhr.headers(key, options.headers[key]);
    };
  }
  xhr.credentials = 'true';

  if (options.method === 'GET') {
    for (let key in options.data) {
      options.url += "?" + key + "=" + options.data[key]
    }
  } else {
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
  }


  xhr.onload = xhr.onerror = function () {
    
    if (xhr.status === 200 && xhr.readyState === 4) {
      let response = xhr.response;
      callback(response, err);
    } else if (xhr.status != 200) {
      let err = `${xhr.status}: ${xhr.statusText}`;
      console.log(err);
    }
  }

  xhr.open(options.method, options.url);
  try {
    xhr.send(formData)
  }
  catch (e) {
    callback(e)
  }


};
