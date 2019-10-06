/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не существует");
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку форму и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener("submit", e => {
      e.preventDefault();
      this.submit();
    });
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    let formData = new FormData(this.element);
    let entries = formData.entries();
    let obj = {};
    for (let item of entries) {
      const key = item[0];
      const value = item[1];
      obj[key] = value;
    }
    return obj;
  }

  onSubmit(options) {}

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    let options = {};
    options.data = this.getData();
    options.method = this.element.getAttribute("method");
    options.url = this.element.getAttribute("action");
    console.log(`options в AsyncForm.submit`);
    for (let key in options){
    console.log(` Ключ ${key} значение ${options.key}`)
    };
    this.onSubmit(options);
  }
}
