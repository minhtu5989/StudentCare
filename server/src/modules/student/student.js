import Student from './student.model';
import _ from 'lodash';

export const getStudents = async userId => {
  try {
    let user = await Student.findById(userId);
    
    if (!user) return 403

    let userInfo = user.toObject();
    delete userInfo.password;
    userInfo = { ...userInfo }

    return userInfo;
    
  } catch (error) {
    throw error;
  }
};

export const saveId = async (userId, personId) => {
  try {
    let user = await Student.findById(userId);
    if (!user) return 403
    if(!personId) return 402
    user.personId = personId
    user.save()
    
  } catch (error) {
    throw error;
  }
};