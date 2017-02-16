var express = require('express');
var bodyParser = require('body-parser')
var app = express();

// parse application/json
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 5000));

var items = [
  { name: 'Walk the Dog', done: true },
  { name: 'Learn JS' }
];

app.get("/api/todo-list", function (req, res) {
  res.send({
    list: items
  });
});

app.post("/api/todo-list", function (req, res) {
  var item = req.body;
  items.push(item);

  res.sendStatus(200);
});

app.post("/api/todo-list/:index/toggle", function (req, res) {
  var index = parseInt(req.params.index);
  items[index].done = !items[index].done;

  res.sendStatus(200);
});

app.delete("/api/todo-list/:index", function (req, res) {
  var index = parseInt(req.params.index);
  items.splice(index, 1);

  res.sendStatus(200);
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
