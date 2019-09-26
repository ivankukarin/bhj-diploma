/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}, callback=(f)=>{f}) => {
  let formData = new FormData;

  let xhr = new XMLHttpRequest();
  
  
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


  xhr.onload = function () {    
    if (xhr.status === 200 && xhr.readyState === 4) {
      let response = xhr.response;
      callback(response)
    }
  }

  xhr.onerror = function() {
    if (xhr.status != 200) {
      throw new Error (xhr.status)
    }
  }

  xhr.open(options.method, options.url);
  try {
    xhr.send(formData)
  }
  catch (err) {
    callback(err)
    }
};
