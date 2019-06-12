// packages
import {BackHandler} from 'react-native';
import {Alert} from 'react-native';

/**
 *  handle back button Android
 * @param  {Function} callback The function to call on click
 */
const handleAndroidBackButton = (callback) => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    callback()
    return true;
  });
};
// remove back-button Android
const removeAndroidBackButtonHandler = (callback) => {
  BackHandler.removeEventListener('hardwareBackPress', () => {
    callback()
  });
}


// Exit app
const exitAlert = () => {
    Alert.alert(
      'Confirm exit',
      'Do you want to quit the app ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
  };

export {
  handleAndroidBackButton, 
  removeAndroidBackButtonHandler, 
  exitAlert
};


// example

// handleBack = () =>{
//   console.log('Press Back Android !');
//   this.props.navigation.navigate('TimeOutScreen')
// }

// // //handle Button Back
// componentDidMount() {
// handleAndroidBackButton(this.handleBack);
// }

// componentWillUnmount() {
// removeAndroidBackButtonHandler(this.handleBack);
// }

// //Back to Exit
// componentDidMount() {
//   handleAndroidBackButton(exitAlert);
// }






// Home handle 

// import {AppState, BackHandler} from 'react-native'

// componentDidMount() {
//   AppState.addEventListener('change', this._handleAppStateChange);
//   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
// }

// componentWillUnmount() {
//   AppState.removeEventListener('change', this._handleAppStateChange);
//   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
// }

// handleBackButton() {
//   return true;
// }

// _handleAppStateChange = (nextAppState) => {

//   if ( this.state.appState == 'background'  && nextAppState === 'active')
//   {           
//       this.props.navigation.reset([NavigationActions.navigate({ routeName: 'TimeOutScreen' })], 0)
//   }

//   this.setState({appState: nextAppState});
// }
