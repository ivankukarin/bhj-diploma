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
    if (element) {
      this.element = element;
    } else {
      throw new Error('Элемент в  TransactionWidget отсутствует')
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    let createIncomeButton = this.element.querySelector( '.create-income-button' );
    let createExpenseButton = this.element.querySelector( '.create-expense-button' );

    createIncomeButton.addEventListener('click', ()=>{
      let modal = App.getModal('newIncome');
      modal.open();
    })

    createExpenseButton.addEventListener('click', ()=>{
      let modal = App.getModal('newExpense');
      modal.open();
    })
  }
}
