import { AuthStore } from './Auth';
import { FaceStore } from './Face';

const authStore = AuthStore.create();
const faceStore = FaceStore.create();

export const stores = {
  authStore,
  faceStore
};

window.MobxStore = stores;


// @inject(stores => ({
//   userStore: stores.userStore,
//   authStore: stores.authStore,
//   }))