import React, {Component} from 'react';
import { UtilityThemeProvider, Box, Text } from 'react-native-design-utility';
import { ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import { NavigationService } from './src/constants/NavigationService';
// import { Provider, } from 'mobx-react/native';

// import { images } from '@constants/images';
// import { cacheImages } from './src/utils/cacheImages'
import { theme } from './src/constants/theme'
// import { store } from './src/stores';

import { AppNav } from "./src/screens/index";

export default class App extends Component{
  // state = {
  //   isReady: false,
  // }

  // componentDidMount(){
  //   this.cacheAssets()
  // }

  // cacheAssets = async () => {
  //   const imagesAssets = cacheImages([
  //     ...Object.values(images),
  //   ]);
  //   await Promise.all([...imagesAssets]);
  //   this.setState({ isReady: true });
  // };
  
  render() {
    // if(!this.state.isReady)
    // return(
    //   <Box f={1} center bg='white'>
    //     <ActivityIndicator size='large'/>
    //   </Box>
    // );
    return (
      // <Provider {...store}>
        <UtilityThemeProvider theme={theme}>
          <SafeAreaView style={{flex:1, backgroundColor: theme.color.white}}>
            <Box center f={1}>
              <StatusBar barStyle='dark-content'/>
              <AppNav ref={ r => NavigationService.setTopLevelNavigator(r) }/>
            </Box>
          </SafeAreaView>
        </UtilityThemeProvider>
      // </Provider>
    );
  }
}

console.disableYellowBox = true
// console.ignoredYellowBox = ['componentWillReceiveProps is', `Warning: componentWillReceiveProps`];
