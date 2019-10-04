/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * Как проставить дополнительно / и зачем?
   **/
  static setCurrent(user) {    
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.user);
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback) {
    createRequest({
      data,
      method: "GET",
      url: this.HOST + this.URL + "/current",
      responseType: "json",
      callback: (err, response) => {
        if (response.user && response.success) {
          User.setCurrent(response.user);
        } else if (!response.success) {
          User.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    return createRequest({
      data,
      method: "POST",
      url: this.HOST + this.URL + "/login",
      responseType: "json",
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        } else {
          console.log("Ответ не пришел" + err);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    return createRequest({
      data,
      method: "POST",
      url: this.HOST + this.URL + "/register",
      responseType: "json",
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        } else {
          console.log(err.error);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {
    return createRequest({
      data,
      method: "POST",
      url: this.HOST + this.URL + "/logout",
      responseType: "json",
      callback: (err, response) => {
        if (response && response.success) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }
}
User.URL = "/user";
User.HOST = Entity.HOST;
