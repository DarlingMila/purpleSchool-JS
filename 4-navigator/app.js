const positionLat = 2; // x
const positionLong = 5; // y

const adressLat = 8;
const adressLong = 13;

const width = adressLat - positionLat; // 6
console.log(width);
const height = adressLong - positionLong; // 8
console.log(height);

const distance = Math.sqrt(width ** 2 + height ** 2);
console.log(distance);
