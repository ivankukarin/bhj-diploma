/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент в  TransactionWidget отсутствует");
    } else {
      this.element = element;
      this.registerEvents();
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    let buttonCreateIncome = this.element.querySelector(
      ".create-income-button"
    );
    let buttonCreateExpense = this.element.querySelector(
      ".create-expense-button"
    );

    buttonCreateIncome.addEventListener("click", () => {
      let modal = App.getModal("newIncome");
      modal.open();
    });

    buttonCreateExpense.addEventListener("click", () => {
      let modal = App.getModal("newExpense");
      modal.open();
    });
  }
}
