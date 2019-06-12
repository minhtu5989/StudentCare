// import axios from 'axios';
const axios = require('axios')

const FIELDS = 'email,name,picture';

const FB_URL = `https://graph.facebook.com/me?fields=${FIELDS}`;

const authAsync = async token => {
  try {
    const res = await axios.get(`${FB_URL}&access_token=${token}`);

    if (res.status === 200) {
      return res.data;
    }

    throw new Error('No success with Facebook');
  } catch (error) {
    throw error;
  }
};

// export const Facebook = {
//   authAsync,
// };

module.exports ={
  authAsync
}

module.exports.Facebook = {
  authAsync
}