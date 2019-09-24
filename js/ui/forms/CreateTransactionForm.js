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

  update() {}

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let elemAccountList = document.querySelector(".accounts-select");
    let accountList = Account.list({}, (response, err) => {
      if (response && response.success === "true") {
        for (let item of response) {
          let elem = `<option value="${item.id}">${item.name}</option>`;
          elemAccountList.insertAdjacentHTML("beforeend", elem);
        }
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
    Transaction.create(options, function(response, err) {
      if (response.success === "true") {
        App.update();
        this.element.reset();

        let type = this.element
          .querySelector([(name = "type")])
          .getAttribute("value");
        let modal = App.getModal(
          "create" + type[0].toUpperCase() + type.slice(1)
        );
        modal.close();
      }
    });
  }
}
