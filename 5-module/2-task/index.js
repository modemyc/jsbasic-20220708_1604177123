function toggleText() {
  // ваш код...
  let text = document.querySelector('#text');
  function onClick (event) {
    if (event.target.classList.contains('toggle-text-button')) {
      text.hidden = !text.hidden;
    }
  }
  document.addEventListener("click", onClick);
}
