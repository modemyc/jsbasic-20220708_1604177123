function highlight(table) {
  // ваш код...
  for (let row of table.rows) {

    if (row.cells[3].dataset.available === 'true') {
      row.classList.toggle('available', true);
    } else if (row.cells[3].dataset.available === 'false') {
      row.classList.toggle('unavailable', true);
    } else if (!row.cells[3].hasAttribute('data-available')) {
      row.hidden = true;
    }

    let genClass = row.cells[2].innerText === 'm' ? 'male' : 'female';
    row.classList.add(genClass);

    if (parseInt(row.cells[1].innerText) < 18)
      row.style.textDecoration = 'line-through';
  }
}
