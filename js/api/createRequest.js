/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest =
  ((options = {}),
  (callback = (err, response) => {
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
      for (let key in options.data.data) {
        options.url += "?" + key + "=" + options.data.data[key];
      }
    } else {
      for (let key in options.data.data) {
        formData.append(key, options.data.data[key]);
      }
    }

    xhr.onload = function() {
      if (xhr.status === 200 && xhr.readyState === 4) {
        let response = xhr.response;
        callback(null, response);
      }
    };

    xhr.onerror = function() {
      callback(new Error("Не удалось загрузить данные" + xhr.status), null);
    };

    xhr.open(options.method, options.url);
    try {
      xhr.send(formData);
    } catch (err) {
      callback(err);
    }
  }));
