import { types, flow, getParent, destroy } from 'mobx-state-tree';

import { TeachingDayModel } from "./TeachingDay";
import { api } from "../../api/ApiConfig";

export const CurrentUserModel = types
  .model('CurrentUserModel', {
    _id: types.identifier,
    email: types.string,
    avatar: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    data: types.optional(types.array(TeachingDayModel), [] ),
  })
  .views(self => ({

    get dataList(){
      return self.data.slice()
    },

    get parent(){
      return getParent(self)
    },
  }))
  .actions(self => ({

}))
  