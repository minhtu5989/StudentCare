import { AuthStore } from './Auth';
import { StuStore } from './Stu';

const authStore = AuthStore.create();
const stuStore = StuStore.create();

export const stores = {
  authStore,
  stuStore
};

window.MobxStore = stores;


// @inject(stores => ({
//   userStore: stores.userStore,
//   authStore: stores.authStore,
//   }))