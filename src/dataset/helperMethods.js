export const selectRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
export const selectRandomUnique = (array, quantity = 1, excluded = []) => {
  let selections = [];
  let bank = array;
  for (let i = 0; i < quantity; i++) {
    let index = Math.floor(Math.random() * bank.length);
    if (!excluded.includes(bank[index])) {
      selections.push(bank[index]);
    }
    bank.splice(index, 1);
  }
  return selections;
};
