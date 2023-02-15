export const sum_total_currency = (arr) => {
  let total = 0;
  for (i = 0; i < arr.length; i++) {
    total += +arr[i].value;
  }
  return currencyFormat.format(total);
};
