import React, {Component} from 'react';
import { UtilityThemeProvider, Box, Text } from 'react-native-design-utility';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationService } from './src/constants/NavigationService';
import { Provider } from 'mobx-react';

import { theme } from './src/constants/theme'
import { stores } from './src/mobx/stores';
import { AppNav } from "./src/navigations/AppNav";

export default class App extends Component{

  componentDidMount(){
    //Load images
  }

  
  render() {
    return (
      <Provider {...stores}>
        <UtilityThemeProvider theme={theme}>
          <SafeAreaView style={{flex:1, backgroundColor: theme.color.white}}>
            <StatusBar barStyle='dark-content'/>
            <AppNav ref={ r => NavigationService.setTopLevelNavigator(r) }/>
          </SafeAreaView>
        </UtilityThemeProvider>
      </Provider>
    );
  }
}

console.disableYellowBox = true
// console.ignoredYellowBox = ['componentWillReceiveProps is', `Warning: componentWillReceiveProps`];
