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
    if (!element) {
      throw new Error("Элемент в  AccountsWidget отсутствует");
    }
    this.element = element;
    this.registerEvents();
    this.update();
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
    
    buttonCreateAccount.addEventListener("click", () => {
      App.getModal("createAccount");
    });

    //  здесь я попытался сделать корретировку с учетом вашей инструкции. и признаться, не совсем понял как это:"20) В методе registerEvents класса AccountsWidget у вас каждый раз будет разное количество аккаунтов. Иногда они будут удаляться, иногда удаляться, а метод вызывается только 1 раз. Так что вам нужен универсальный подход для этого. Попробуйте повесить обработчик события на элемент виждета, а уже из него получать аккаунт, на котороый вы кликнули."     Но может лучше сделать обработчик не на this.element, а на элемент содержащий все счета в блоке, что бы при удалении или добавлениии счета обновлялась функция указанная ниже, или в this.update() добавить еще раз this.registerEvents() ?? //
  
    this.element.addEventListener('change',()=>{
      let allAccounts = document.querySelectorAll(".account");
      for (let account of allAccounts) {
      account.addEventListener("click", () => {
        account.onSelectAccount();
      });
    }
    })

    
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
      Account.list({}, (response, err) => {
        if (response & response.success) {
          this.clear();
          for (let account of response) {
            this.render(account);
          }
        }
      });
    }
  }

  /**
   * Отрисовывает массив счетов с помощью
   * метода renderItem
   * */
  render(data) {
    for (let account of data) {
      this.renderItem(account);
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const allAccounts = document.querySelectorAll(".account");
    for (let account of allAccounts) {
      account.remove();
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
    const account = this.element.querySelector(
      '.account[data-id="${this.currentAccountId}"]'
    );
    if (account) {
      if (account.classList.contains("active")) {
        account.classList.remove("active");
      }
    }
    element.classList.add(".active");
    this.currentAccountId = element.dataset.id;
    App.showPage("transactions", { account_id: this.currentAccountId });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    return `<li class="active" data-id="${item.id}"><a href="#"><span>${item.name}/span>/<span>${item.sun} ₽</span></a></li>`;
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
