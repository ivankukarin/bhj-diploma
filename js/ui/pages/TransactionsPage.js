/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент в  TransactionsPages отсутствует");
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    let id;
    let buttonRemoveAccount = this.element.querySelector(".remove-account");

    buttonRemoveAccount.addEventListener("click", () => {
      this.removeAccount();
    });

    this.element.addEventListener("click", e => {
      if (e.target.closest(".transaction__remove")) {
        let id = e.target.closest(".transaction__remove").dataset.id;
        this.removeTransaction(id);
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      if (confirm("Вы действительно хотите удалить счет?")) {
        let id = this.lastOptions.account_id;
        Account.remove("id", id, (err, response) => {
          if (response && response.success) {
            App.update();
          }
        });
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction(id) {
    if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
      Transaction.remove("id", id, (err, response) => {
        if (response && response.success) {
          App.update();
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (options) {
      this.lastOptions = options;

      Account.get("id", options.account_id, (err, response) => {
        if (response) {
          this.renderTitle(response.data.name);
        }
      });

      Transaction.list(options, (err, response) => {
        if (response.data && response.data != undefined) {
          this.renderTransactions(response.data);
        }
      });
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счета");
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    this.element.querySelector(".content-title").textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    let t = new Date(date);
    let months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
    ];
    let month = months[t.getMonth()];
    let day = t.getDate();
    let year = t.getFullYear();
    let hours = t.getHours();
    let minutes = t.getMinutes();
    let formatNN = function(number) {
      if (number < 10) {
        return "0" + number;
      } else {
        return number;
      }
    };

    return `${formatNN(day)} ${month} ${year} г. в ${formatNN(
      hours
    )}:${formatNN(minutes)}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    let date = this.formatDate(item.created_at);
    let sumTransaction = item.sum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");

    return `<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>          
          <div class="transaction__date">${date}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      ${sumTransaction}<span class="currency"> ₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
    </div>`;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(response) {
    let elem = this.element.querySelector(".content");
    let htmlElem = "";
    if (response) {
      for (let i = 0; i < response.length; i++) {
        let transactionHTML = this.getTransactionHTML(response[i]);
        htmlElem = transactionHTML + htmlElem;
      }
    }
    elem.innerHTML = htmlElem;
  }
}
