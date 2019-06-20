import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { theme } from "../../constants/theme";

export default props => {
  const { children, btnStyle, txtStyle } = props

  return (
    <TouchableOpacity
      {...props}
      style={[styles.buttonWrapper, btnStyle]}
    >
      <Text style={[styles.text, txtStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.white,
    marginHorizontal: 35,
  },
  text: {
    fontSize: 18,
  }
})
