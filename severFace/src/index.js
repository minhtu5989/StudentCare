import express from 'express';

import middlewaresConfig from './config/middlewares';
import './config/db';
import excelToJson from 'convert-excel-to-json';
 
// import { CustomerRoutes, AddressRoutes } from './modules';
// import { FaceRoutes } from './modules';

const app = express();

middlewaresConfig(app);

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.get('/tkbHutech', (req, res) => {
  const result = excelToJson({
    sourceFile: '/Users/lminhtu1/Desktop/workspace/StudentCare/severFace/src/TKB.xlsx'
  });
  res.status(201).json({ result })
});



app.get('/abc', (req, res) => {
  res.status(201).json({ user })
})

// app.use('/api/v1/customers', CustomerRoutes);
// app.use('/api/v1/face', FaceRoutes);


app.listen(3500, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running`);
  }
});
