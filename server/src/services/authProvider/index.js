// import { Facebook } from './Facebook';
// import { Google } from './Google';

// export const AuthProvider = {
//   Facebook,
//   Google,
// };

const { Facebook } = require('./Facebook')
const { Google } = require('./Google')

module.exports.AuthProvider ={
  Facebook, 
  Google
}