var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

import middlewaresConfig from './config/middlewares';
import { CustomerRoutes, StudentRoutes, } from './modules';
import './config/db'
import "./modules/dataExcel/index";
import Customer from "./modules/customer/customer.model";
import Student from "./modules/student/student.model";

middlewaresConfig(app);


app.use('/api/tuluongV1/customers', CustomerRoutes);
app.use('/api/tuluongV1/students', StudentRoutes);

//===============Test
app.get('/test', (req, res) => {
  res.send('Welcome');
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