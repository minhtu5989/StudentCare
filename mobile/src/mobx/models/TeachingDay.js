import { types, flow, getParent, destroy } from 'mobx-state-tree';

import { api } from "../../api/ApiConfig";

export const TeachingDayModel = types
  .model('TeachingDayModel', {
    _id: types.identifier,
    nhomBang: types.maybeNull(types.string),
    codeCourse: types.maybeNull(types.string),
    courseName: types.maybeNull(types.string),
    cr: types.maybeNull(types.string), 
    noOfStudent: types.maybeNull(types.string), 
    lectureCode: types.maybeNull(types.string),
    lecturer: types.maybeNull(types.string),
    weekday: types.maybeNull(types.string),
    startingSesions: types.maybeNull(types.string),
    noOfSecsions: types.maybeNull(types.string),
    room: types.maybeNull(types.string),
    lopBang: types.maybeNull(types.string),
    class: types.maybeNull(types.string),
    timeable: types.maybeNull(types.string),
    week: types.maybeNull(types.string),
    examDate: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    lastName: types.maybeNull(types.string),
    firstName: types.maybeNull(types.string),
    shs: types.maybeNull(types.string),
    teachingDay: types.maybeNull(types.string)
  })
  .views(self => ({
    
  }))
  .actions(self => ({

}))
  