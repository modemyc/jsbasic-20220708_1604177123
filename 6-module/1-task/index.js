/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elemInit(rows);
  }

  get elem() {
      return this._elem;
    }

  elemInit(rows) {
    this._elem = document.createElement("table");
    this.elem.insertAdjacentHTML(
      "beforeend",
      '<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>'
    );

    const tbody = document.createElement("tbody");
    this._elem.append(tbody);
    rows.forEach((element) => {
      const tr = document.createElement("tr");
      tbody.append(tr);

      tr.insertAdjacentHTML(
        "beforeend",
        `<td>${element.name}</td><td>${element.age}</td><td>${element.salary}</td><td>${element.city}</td><td><button>X</button></td>`
      );
      tr.querySelector("button").addEventListener("click", (event) => {
        event.target.closest("tr").remove();
      });
    });
  }

 

}