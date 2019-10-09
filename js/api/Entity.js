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
  static list(data, callback = f => f) {
    let options = {
      data,
      method: "GET",
      url: this.HOST + this.URL,
      responseType: "json",
      callback
    };
    return createRequest(options);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = f => f) {
    Object.assign(data, { _method: "PUT" });
    let options = {
      data,
      url: this.HOST + this.URL,
      responseType: "json",
      method: "POST",
      callback
    };
    return createRequest(options);
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id, value, callback = f => f) {
    let data = {};
    Object.assign(data, { [id]: value });

    let options = {
      data,
      url: this.HOST + this.URL,
      responseType: "json",
      method: "GET",
      callback
    };
    return createRequest(options);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id, value, callback = f => f) {
    let data = {};
    Object.assign(data, { _method: "DELETE", [id]: value });
    console.log(data);
    let options = {
      data,
      url: this.HOST + this.URL,
      responseType: "json",
      method: "POST",
      callback
    };
    return createRequest(options);
  }
}

Entity.HOST = "https://bhj-diplom.letsdocode.ru";
Entity.URL = "";
