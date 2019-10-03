/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(options) {
    Account.create(
      (options,
      (err, response) => {
        if (response && response.success === true) {
          this.element.reset();
          App.update();
          let createAccountModal = App.getModal(createAccount);
          createAccountModal.onClose(e);
          App.update();
        } else {
          console.log(`Ошибка ${err}`);
        }
      })
    );
  }
}
