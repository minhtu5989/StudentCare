import * as CustomerServices from './student';

export const getUserInfo = async (req, res) => {
  try {

    if(!req.user) return res.json({ status: 401, message: 'No User' });
    const userInfo = await CustomerServices.me2(req.user._id);
    if(userInfo == 401) return res.json({ status: 402, message: 'User not exist' }); 
    res.json({ status: 200, userInfo });

  } catch (error) {
    res.json({ status: 400, message: 'Network request failed' });
  }
};


