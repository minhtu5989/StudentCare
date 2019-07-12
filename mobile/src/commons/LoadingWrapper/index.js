import React, { Component } from 'react'

import { View, StatusBar, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { theme } from '../../constants/theme';

const { ...props } = this.props;
// destructuring 
const Wrapper = ({ children, isLoading, customStyle, color, size }) => (

  <View style={[styles.container, customStyle]}>
    <StatusBar barStyle='dark-content' />
    {children}
    <Spinner visible={isLoading} color={color} size={size} {...props} />
  </View>
)

const styles = StyleSheet.create({
  container: 1,
})

Wrapper.defaultProps = {
  color: theme.color.myAppColor,
  size: 'large'
};

export default Wrapper