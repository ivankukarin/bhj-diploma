/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = ( options  ) => {
    let formData = new FormData();

    let xhr = new XMLHttpRequest();
    

    xhr.responseType = options.responseType;
    if (options.hasOwnProperty("headers")) {
      for (let key in options.headers) {
        xhr.headers(key, options.headers[key]);
      }
    }
    xhr.credentials = "true";

    if (options.method === "GET") {
      for (let key in options.data) {
        options.url += "?" + key + "=" + options.data[key];
      }
    } else {
      for (let key in options.data) {
        formData.append(key, options.data[key]);
      }
    }

    xhr.onload = function() {
      if (xhr.status === 200 && xhr.readyState === 4) {
        let response = xhr.response;
        options.callback(null, response);
        console.log(typeof(response), response)
      }
    };

    xhr.onerror = function() {
      options.callback(new Error("Не удалось загрузить данные" + xhr.status), null);
    };

    xhr.open(options.method, options.url);
    try {
      xhr.send(formData);
    } catch (err) {
      callback(err);
    }
};
