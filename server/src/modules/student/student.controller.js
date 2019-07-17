import * as StudentServices from './student';

export const getStuInfo = async (req, res) => {
    try {
      if(!req.user) return res.json({ status: 404, message: 'Unauthentication' });

      let userInfo = await StudentServices.getStudents(req.user._id);

      if(userInfo == 403) return res.json({ status: 403, message: 'Account is not exist' });

      return res.json({ status: 200, students: userInfo });
  
    } catch (error) {
      return res.json({ status: 400, message: 'Network request failed' })
    }
  };

  export const savePersonId = async (req, res) => {
    try {
      const { personId } = req.body

      if(!req.user) return res.json({ status: 404, message: 'Unauthentication' });

      let userInfo = await StudentServices.saveId(req.user._id, personId);

      if(userInfo == 403) return res.json({ status: 403, message: 'Account is not exist' });
      if(userInfo == 402) return res.json({ status: 402, message: 'Get no personId' });

      return res.json({ status: 200 });
  
    } catch (error) {
      return res.json({ status: 400, message: 'Network request failed' })
    }
  };savePersonId