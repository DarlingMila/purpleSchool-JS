function crypto(password) {
  const [firstHalf, secondHalf] = cutInHalf(password);

  firstHalf.reverse();

  const el1 = secondHalf.pop();
  const el2 = firstHalf.pop();

  const cryptoPassword = new Array(el1, ...firstHalf, ...secondHalf, el2).join(
    ""
  );

  console.log(cryptoPassword);
  return cryptoPassword;
}

function check(crypted, original) {
  const deCryptoPassword = crypto(crypted);

  console.log(deCryptoPassword === original);
  return deCryptoPassword === original;
}

function cutInHalf(password) {
  const wordLength = password.length;

  const splitedPassword = password.split("");

  const firstHalf = sliceArray(splitedPassword, 0, wordLength / 2);
  const secondHalf = sliceArray(splitedPassword, wordLength / 2, wordLength);

  return [firstHalf, secondHalf];
}

function sliceArray(array, start, end) {
  return array.slice(start, end);
}

crypto("password");
check("dssaworp", "password");
