import { types, flow, getParent, destroy } from 'mobx-state-tree';
import { LearningDayModel } from "./LearningDay";

import { api } from "../../api/ApiConfig";

export const StudentModel = types
  .model('StudentModel', {
    userName: types.maybeNull(types.string),
    holotvn: types.maybeNull(types.string),
    tenvn: types.maybeNull(types.string),
    avatar: types.maybeNull(types.string),
    tenlop: types.maybeNull(types.string),
    data: types.optional(types.array(LearningDayModel), [] ),
  })
  .views(self => ({
    
  }))
  .actions(self => ({

}))
  