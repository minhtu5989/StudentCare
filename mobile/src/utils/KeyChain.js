import * as Keychain from 'react-native-keychain';
import { NavigationService } from '@src/constants'

//=========================SET TOKEN
try {
    const credentials = await Keychain.setGenericPassword(
      'token',
      tokenValue,
    );
    if(credentials){
      console.log('Credentials saved!');
    }
} catch (err) {
    console.log("Could not load credentials....Error: ", err);
}



//=========================VERYFFI TOKEN
try {
  const credentials = await Keychain.getGenericPassword();
  
  if (credentials) {
    console.log("Credentials loaded!");
    NavigationService.navigate('Main')
  } else {
    console.log("No credentials stored.");
    NavigationService.navigate('Auth')
  }
} catch (err) {
  console.log("Could not load credentials....Error: ", err);
}





//=========================RESET TOKEN
try {
  const response = await Keychain.resetGenericPassword();
  if(response){
    console.log("Credentials Reset!");
  }
} catch (err) {
  console.log("Could not reset credentials......Error: ", err);
}

