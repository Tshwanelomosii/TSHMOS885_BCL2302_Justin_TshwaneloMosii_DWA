const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

//Exercise 1
names.forEach(name => {
  console.log(name);
});


// Exercise 2
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

// Exercise 3
const uppercaseProvinces = provinces.map(province => province.toUpperCase());
console.log(uppercaseProvinces);

// Exercise 4
const nameLengths = names.map(name => name.length);
console.log(nameLengths);

// Exercise 5
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// Exercise 6
const filteredProvinces = provinces.filter(province => !province.includes('Cape'));
console.log(filteredProvinces.length);

// Exercise 7

const SCharacter = names.map(name => name.split ('').some (char => char.toLowerCase() === 's'));
console.log(SCharacter);

const Scharacter = names.map(name => /s/.test(name));
console.log(SCharacter);


// Exercise 8
const nameProvinceObject = names.reduce((obj, name, index) => {
  obj[name] = provinces[index];
  return obj;
}, {});
console.log(nameProvinceObject);



const products = [
  { product: 'banana', price: "2" },
  { product: 'mango', price: 6 },
  { product: 'potato', price: ' ' },
  { product: 'avocado', price: "8" },
  { product: 'coffee', price: 10 },
  { product: 'tea', price: '' },
];

// Exercise 1
products.forEach(product => {
  console.log(product.product);
});

// Exercise 2
const filteredProducts = products.filter(product => product.product.length <= 5);
console.log(filteredProducts);

// Exercise 3
const convertedPrices = filteredProducts
  .filter(product => typeof product.price === 'number')
  .map(product => {
    product.price = parseFloat(product.price);
    return product;
  });
const totalCombinedPrice = convertedPrices.reduce((total, product) => total + product.price, 0);
console.log(totalCombinedPrice);

// Exercise 4
const concatenatedNames = products.reduce((namesString, product, index) => {
  namesString += product.product;
  if (index !== products.length - 1) {
    namesString += ', ';
  }
  return namesString;
}, '');
console.log(concatenatedNames);

// Exercise 5
const { highest, lowest } = products.reduce((result, product) => {


  if (typeof parseInt(product.price) == 'number'){
    
    if (!result.highest || product.price > result.highest.price) {
      
      result.highest = product;
    }
    if (product.product == 'banana') {
      result.lowest = product;
    }
  }
  return result;
}, {});
console.log(`Highest: ${highest.product}. Lowest: ${lowest.product}`);

// Exercise 6
const recreatedObject = Object.entries(products).reduce((newObject, [key, value]) => {
  if (key === 'product') {
    newObject['name'] = value;
  } else if (key === 'price') {
    newObject['cost'] = value;
  } else {
    newObject[key] = value;
  }
  return newObject;
}, {});
console.log(recreatedObject);