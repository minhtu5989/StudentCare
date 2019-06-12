var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

import middlewaresConfig from './config/middlewares';
import { CustomerRoutes, AddressRoutes } from './modules';
import './config/db'

middlewaresConfig(app);

app.get('/test', (req, res) => {
  res.send('Welcome');
});

app.use('/api/v1/customers', CustomerRoutes);
app.use('/api/v1/addresses', AddressRoutes);


server.listen( process.env.PORT || 3000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running`);
  }
});

io.on('connection', socket => {
  socket.on('CHAT_SEX', message => {
      io.emit('SERVER_REPLY', message )
  });
});
console.log("Socket started");