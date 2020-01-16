const express = require('express');
const path = require('path');
const app = express();

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db/data.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})

app.use(express.static(__dirname + '/dist/order-system-pf'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/order-system-pf/index.html'));
});

app.listen(process.env.PORT || 3000);