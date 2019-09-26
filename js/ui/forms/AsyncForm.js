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
    this.element.addEventListener("click", e => {
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
    let form = this.element.querySelector("form");
    let formData = new FormData(form);
    entries = formData.entries();
    let obj = {};
    for (let item of entries) {
      const key = item[0],
        value = item[1];
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
    options.url = this.element.getAttribute("action");
    options.method = this.element.getAttribute("method");
    options.data = this.getData();
    this.onSubmit(options);
  }
}
