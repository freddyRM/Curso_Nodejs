var dataFile = require('./data.json')
var fs = require('fs')

// console.log(dataFile)
//  console.log(dataFile.name)

// fs.readFile('./other.txt','utf-8',(err, data) => {
// 	console.log(data);
// })

fs.readFile('./data.json','utf-8',(err, data) => {
	var received = JSON.parse(data);
	//console.log(received.address);
})

//directorios
fs.readdir('../', (err,data) => {
	//console.log(data);
})

var sayHello = "How are you";

var obj = {"name":"Freddy Rodriguez", "address":"123 Main St"};

//escribir
fs.writeFile('myFileObj.json', JSON.stringify(obj), (err) => {
	console.log("Success", err)
});









