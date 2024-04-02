const jsonString = '{"product_id": 7, "quantity": 1, "price": 191250},{"product_id": 6, "quantity": 2, "price": 159800}';

// Tách chuỗi thành các object JSON riêng lẻ
const jsonObjects = jsonString.split('},{');


// Loại bỏ dấu ngoặc đầu và cuối cho các object JSON ở vị trí đầu và cuối mảng
jsonObjects[0] = jsonObjects[0].replace('{', '');
jsonObjects[jsonObjects.length - 1] = jsonObjects[jsonObjects.length - 1].replace('}', '');

// Chuyển đổi từng object JSON thành đối tượng JavaScript
const objectArray = jsonObjects.map(jsonString => JSON.parse(`{${jsonString}}`));

console.log(objectArray);
