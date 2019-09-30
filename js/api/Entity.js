/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'http://bhj-diploma.u-w.me'.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
  //  * */
  static list(data, callback(err, response)) {
    createRequest({
      data,
      method: "GET",
      url: this.HOST + this.URL,
      responseType: "json",
      callback(err, response) {
        callback(err, response)
      }
    })
  }
  

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback(err, response)) {
    Object.assign(data, { _method: "PUT" });
    let options = {
      data,
      url: this.HOST + this.URL,
      responseType: "json",
      method: "POST",
      callback(err, response);
    };
    createRequest(options, callback (err,response));
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = "", data, callback(err, response)) {
    let options = {
      url: this.HOST + this.URL + "/" + id,
      responseType: "json",
      method: "GET",
      data,
      callback(err, response)
      };
    return createRequest(options, callback (err,response));
  }

  /**
   * Обновляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static update(id = "", data, callback(err, response)) {
    let options = {
      url: this.HOST + this.URL + "/" + id,
      responseType: "json",
      method: "POST",
      data,
      callback(err, response);
    };
    createRequest(options, callback (err,response));
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = "", data, callback(err, response)) {
    Object.assign(data, { _method: "DELETE" });

    createRequest({
      data,
      url: this.HOST + this.URL + "/" + id,
      responseType: "json",
      method: "POST",
      callback(err, response);
    }, callback (err,response))       
  }
}
Entity.HOST = "https://bhj-diplom.letsdocode.ru";
Entity.URL = "";
