import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

// destructuring 
const Wrapper = ({ children, isLoading = false, customStyle }) => (
  <View style={[styles.container, customStyle]}>
    <StatusBar barStyle='dark-content' />
    {children}
    <Spinner visible={isLoading}/>
  </View>
)

const styles = StyleSheet.create({
  container: 1,
})

export default Wrapper