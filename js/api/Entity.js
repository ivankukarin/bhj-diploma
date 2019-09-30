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
   * */
  static list(data, callback(response, err){
    createRequest({
      data,
      method: "GET",
      url: this.HOST + this.URL,
      responseType: "json",
      callback(response, err)
      })
    })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    Object.assign(data, { _method: "PUT" });
    let options = {
      data,
      url: this.HOST + this.URL,
      responseType: "json",
      method: "POST",
      callback: callback
    };
    return createRequest(options);
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = "", data, callback = f => f) {
    let options = {
      url: this.HOST + this.URL + "/" + id,
      responseType: "json",
      method: "GET",
      data,
      callback(response, err)
    };
    return createRequest(options);
  }

  /**
   * Обновляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static update(id = "", data, callback = (response, err) => {
    let options = {
      url: this.HOST + this.URL + "/" + id,
      responseType: "json",
      method: "POST",
      data,
      callback(response,err);
    };

    createRequest(options);
  })

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = "", data, callback=(response, err)=>{
    Object.assign(data, { _method: "DELETE" });
    createRequest({
      url: this.HOST + this.URL + "/" + id,
      responseType: "json",
      method: "POST",
      callback(response, err)
    };
    callback(response, err));    
  })
}
Entity.HOST = "https://bhj-diplom.letsdocode.ru";
Entity.URL = "";
