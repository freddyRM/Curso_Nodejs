var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var http = require("http").Server(app);
var socketio = require("socket.io")(http);

var mongoose = require("mongoose");

var theDataBaseUrl = ""

app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

// ya no acepta un callback como segundo argumento
/* mongoose.connect(theDataBaseUrl, (err) => {
    console.log("Success if not", err);
}); */

// esta es la que se usa actualmente  usando async await
async function connectDB() {
    try {
        await mongoose.connect(theDataBaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Conexión exitosa a MongoDB");
    } catch (err) {
        console.error("Error al conectar a MongoDB:", err);
    }
}
connectDB();

// usando .then.catch
/* mongoose.connect(theDataBaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión a MongoDB establecida"))
  .catch(err => console.error("Error al conectar a MongoDB:", err));
 */

var Item = mongoose.model('Item', {
    item: String
});

/* var allItems = [
    {"item":"Eggs"},{"item":"Bread"}
]; */

/* app.get('/items', (req,res) => {
    // res.send({"item":"Eggs"});
    Item.find({},(err,allItems) =>{
        res.send(allItems);
    }); 
}); */

app.get('/items', async (req, res) => {
    try {
        const allItems = await Item.find({});
        res.send(allItems);
    } catch (err) {
        console.error("Error al obtener items:", err);
        res.status(500).send("Error al obtener los items");
    }
});


/* app.post('/items', (req,res) => {
    // allItems.push(req.body);
    var item = new Item(req.body); 
    item.save((err) => {
        if(err){
            sendStatus(500);
        }else{
            socketio.emit('broadcast', req.body);
            res.sendStatus(200);
        }
    })

    // socketio.emit('broadcast', req.body);
    // res.sendStatus(200);
}); */

app.post('/items', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();  // ✅ Ahora usamos `await`
        socketio.emit('broadcast', req.body);
        res.sendStatus(200);
    } catch (err) {
        console.error("Error al insertar item:", err);
        res.status(500).send("Error al insertar el item");
    }
});

socketio.on('connection', (socket) => {
    console.log("Roomate Connected");
});

socketio.on('connection', (socket) => {
    console.log("Roomate Connected");
})

var server = http.listen(3000, () => {
    console.log("Server running at http://localhost:"+ server.address().port);
});

/* nota: Mongoose ya no usa callbacks: Ahora usa Promises, por eso await Item.find({}) y await item.save().
Siempre manejar errores con try/catch para evitar que la app se cierre si hay un problema.
sendStatus(500) no está definido: Usa res.status(500).send(...) para errores. */