import React, { Component } from 'react'
import IconVector from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

import { NavigationService } from "../../constants/NavigationService";
import { theme } from "../../constants/theme";

const leftBtn = (
  <TouchableOpacity onPress={() => NavigationService.back()} style={{ padding:10 }}>
    <IconVector name="ios-arrow-back" size={30} color={theme.color.white} />
  </TouchableOpacity>
) 

export default class MyHeader extends Component {
  render() {
    const { title, ...props } = this.props
    return (
      <Header
        statusBarProps={{ barStyle: 'dark-content', }}
        containerStyle={{
          backgroundColor: theme.color.myAppColor,
          justifyContent: 'space-around',
        }} 
        leftComponent={leftBtn}
        rightComponent
        centerComponent={{ text: title, style: { color: theme.color.white, fontWeight:'800', fontSize: 17, } }}
        {...props}  // destructuring 
      />
    );
  }
}