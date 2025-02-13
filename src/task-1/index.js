//Task 1
const sum_to_n_a = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};

let sum_to_n_b = function (n) {
  if (n === 1) return 1;
  return n + sum_to_n_b(n - 1);
};

let sum_to_n_c = function (n) {
  let sum = (n * (n + 1)) / 2;
  //   console.log(sum);
  return sum;
};
// console.log(sum_to_n_a(5));
// console.log(sum_to_n_c(5));
// console.log(sum_to_n_b(5));
