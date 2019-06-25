import { types, flow, getParent, destroy } from 'mobx-state-tree';

import { UserAddressModel } from "../models/UserAddresses";
import { baseApi } from "../api/Api";

export const CurrentUserModel = types
  .model('CurrentUserModel', {
    _id: types.identifier,
    firstName: types.maybeNull(types.string),
    lastName: types.maybeNull(types.string),
    avatarUrl: types.maybeNull(types.string),
    addresses: types.optional(types.array(UserAddressModel), [] ),
    notifiToken: types.optional(types.array(types.model({token: types.string})), [] ),
  })
  .views(self => ({
    get totalAddresses(){
      return self.addresses.length
    },

    get addressList(){
      return self.addresses.slice()
    },

    get parent(){
      return getParent(self)
    },
  }))
  .actions(self => ({

    createAddress: flow(function*(data){
      try {
        const res = yield baseApi
        .url('/addresses')
        // .auth(`Bearer ${self.parent.authToken}`)
        .headers({ Authorization: `Bearer ${self.parent.authToken}` })
        .post({ data })
        .json()

        if (res.address) {
          self.addresses.push(res.address);
        }

        return res;
      } catch (error) {
        throw error;
      }
    }),

    getAddresses: flow(function*(){
      try {
        const res = yield baseApi
        .url('/addresses')
        .auth(`Bearer ${self.parent.authToken}`)
        // .headers({ Authorization: `Bearer ${self.parent.authToken}` })
        .get()
        .json()

        if(Array.isArray(res.addresses)){      //check boolean Array
            return self.addresses = res.addresses
        }
      } catch (error) {
        throw error;
      }
    }),

    removeAddress(address){
        // self.addresses = self.addresses.filter(
        //   el => el._id !== address._id
        // )
        destroy(address)
        console.log('Delete Address Successful');
    },

}))
  