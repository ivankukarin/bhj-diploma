/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    User.register(options, (err, respone) => {
      if (response && response.success === 'true') {
        this.element.reset();
        App.setState('user-logged');
        let registerFormModul = getModal('register');
        registerFormModul.close();
      }
    });
  }
}
