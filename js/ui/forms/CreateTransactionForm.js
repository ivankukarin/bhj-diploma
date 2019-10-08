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
    let formsAccountList = document.querySelectorAll("select.accounts-select");

    Account.list(User.current(), (err, response) => {
      for (let form of formsAccountList) {
        form.innerHTML = "";
      }

      if (response) {
        for (let i = 0; i < response.data.length; i++) {
          let item = response.data[i];
          let elem = `<option value="${item.id}">${item.name} ${item.sum} ₽</option>`;
          for (let form of formsAccountList)
            form.insertAdjacentHTML("beforeEnd", elem);
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
    Transaction.create(options.data, (err, response) => {
      if (response) {
        this.element.reset();
        let type = this.element.querySelector("[name = type]").getAttribute("value");
        let typeModal = "new" + type[0].toUpperCase() + type.slice(1);
        App.getModal(typeModal).close();
        App.update();
      }
    });
  }
}
