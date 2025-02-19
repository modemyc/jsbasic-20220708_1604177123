function truncate(str, maxlength) {
  // ваш код...
  if (str.length > maxlength) {
    return (str.slice(0, maxlength - 1) + '…');
  } else {
    return str;
  }
}
