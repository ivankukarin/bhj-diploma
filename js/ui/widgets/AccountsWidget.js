/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
      this.update();
    } else {
      throw new Error('Элемент в  AccountsWidget отсутствует')
    }

  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    let buttonCreateAccount = document.querySelector(".create-account");
    let allAccounts = document.querySelectorAll('.account');

    buttonCreateAccount.addEventListener('click', () => {
      let modalNewAccount = getModal('createAccount');
    })

    // let allAccounts = document.querySelectorAll('.account');

    for (let account of allAccounts) {
      account.addEventListener('click', () => {
        account.onSelectAccount()
      })
    }
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода render()
   * */
  update() {
    if (User.current()) {
      let accountList = Account.list();
      for (let account of accountList) {
        this.clear();
        this.render(account);
      }
    }
  }

  /**
   * Отрисовывает массив счетов с помощью
   * метода renderItem
   * */
  render(data) {
    for (let account of data){
      this.renderItem(account);
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const allAccounts = document.querySelectorAll('.account')
    for (let account of allAccounts) {
      account.remove()
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    const allAccounts = document.querySelectorAll('.account')
    for (let account of allAccounts) {
      account.addEventListener('click', () => {
        for (let account of allAccounts) {
          if (account.classList.contains('active')) {
            account.classList.remove('active');
          }
        }
        account.classList.add('active');
      })
    }
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    let html = `<li class="active" data-id="${item.id}"><a href="#"><span>${item.name}/span>/<span>${item.sun} ₽</span></a></li>`;
    return html;
  }

  /**
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(item) {
    this.element.insertAdjacentHTML("beforeend", getAccountHTML(item));
  }
}
