var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

import middlewaresConfig from './config/middlewares';
import { CustomerRoutes, StudentRoutes, CheckUserRoutes } from './modules';
import './config/db'
import { dataExcel } from "./modules/dataExcel/index";

middlewaresConfig(app);


app.use('/api/v1/checkUser', CheckUserRoutes);
app.use('/api/v1/customers', CustomerRoutes);
// app.use('/api/v1/students', StudentRoutes);

//===============Test
app.get('/test', (req, res) => {
  res.send('Welcome');
});

app.get('/tkbHutech', (req, res) => {
  res.json({ dataExcel })
});



server.listen( process.env.PORT || 3000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running`);
  }
});



io.on('connection', socket => {
  socket.on('CHAT_NIGHT', message => {
      io.emit('SERVER_REPLY', message )
  });
});
console.log("Socket started");