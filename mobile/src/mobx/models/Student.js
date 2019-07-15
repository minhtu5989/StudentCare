import { types, flow, getParent, destroy } from 'mobx-state-tree';
import { LearningDayModel } from "./LearningDay";

import { api } from "../../api/ApiConfig";

export const StudentModel = types
  .model('StudentModel', {
    _id: types.identifier,
    userName: types.maybeNull(types.string),
    password: types.maybeNull(types.string),
    role: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    holotvn: types.maybeNull(types.string),
    tenvn: types.maybeNull(types.string),
    avatar: types.maybeNull(types.string),
    mobile: types.maybeNull(types.string),
    tenlop: types.maybeNull(types.string),
    tenns: types.maybeNull(types.string),
    ngaysinh: types.maybeNull(types.string),
    data: types.optional(types.array(LearningDayModel), [] ),
  })
  .views(self => ({
    
  }))
  .actions(self => ({

}))
  