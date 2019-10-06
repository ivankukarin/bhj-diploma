/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  // не нашел описания по этому методу.
  update() {
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let elemAccountList = document.querySelector(".accounts-select");
    /// этим очищаю список транзакций перед отрисовкой
    elemAccountList.innerHTML = "";
    Account.list({}, (err, response) => {
      if (response && response.success === true) {
        for (let item of response) {
          let elem = `<option value="${item.id}">${item.name}</option>`;
          elemAccountList.insertAdjacentHTML("beforeend", elem);
        }
      } else {
        console.log(`Ошибка ${err}`);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options.data, function(response, err) {
      if (response & response.success) {
        this.element.reset();
        let type = this.element
          .querySelector([(name = "type")])
          .getAttribute("value");
        let modal = App.getModal("new" + type[0].toUpperCase() + type.slice(1));
        modal.close();
        App.update();
      }
    });
  }
}
