/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";
  static HOST = Entity.HOST;
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
    return localStorage.user && JSON.parse(localStorage.user);
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
      callback(response, err) {
        if (response.user & response.success) {
          this.setCurrent(response.user);
        } else if (response.success === "false") {
          this.unsetCurrent();
        }
        callback(response, err);
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
    createRequest({
      data,
      method: "POST",
      url: this.HOST + this.URL + "/login",
      responseType: "json",
      callback(response) {
        if (response && response.success === "true") {
          this.setCurrent(response.user);
        }
        callback(response, err);
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
    createRequest({
      data,
      method: "POST",
      url: this.HOST + this.URL + "/register",
      responseType: "json",
      callback(response, err) {
        if (response && response.success === "true") {
          this.setCurrent(response.user);
        }
        callback(response, err);
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {
    createRequest({
      data,
      method: "POST",
      url: this.HOST + this.URL + "/logout",
      responseType: "json",
      callback(response, err) {
        if (response && response.success === "true") {
          this.unsetCurrent();
        }
        callback(response, err);
      }
    });
  }
}
