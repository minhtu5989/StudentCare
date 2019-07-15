import { types, flow, getParent, destroy } from 'mobx-state-tree';
import { StudentModel } from "./Student";
import { api } from "../../api/ApiConfig";

export const CountModel = types
  .model('CountModel', {
    exist: types.optional(types.array(StudentModel), [] ),
    noExist: types.optional(types.array(StudentModel), [] ),
    semiExist: types.optional(types.array(StudentModel), [] ),
  })
  .views(self => ({
    
  }))
  .actions(self => ({

}))
  