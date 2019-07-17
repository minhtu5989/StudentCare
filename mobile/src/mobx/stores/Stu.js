import { types, flow } from 'mobx-state-tree';

import { NavigationService } from '../../constants/NavigationService'
import { api } from '../../api/ApiConfig'
import { StudentModel } from "../models/Student";
import { stores } from '../stores';

export const StuStore = types
.model(`stuStore`, {
  students: StudentModel,
})
.actions(self => ({
  getStu: flow(function*(){
    try {
      const token = yield stores.authStore.verifyToken()
      const res = yield api.GetStuInfo
        .headers({ 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        })
        .get()
        .json()

      if(!res) throw new Error
      
      return self.students = res.students

    } catch (error) {
      console.log('................Error:   ', error)
    }
  }),
}))




