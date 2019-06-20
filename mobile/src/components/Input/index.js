import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { theme } from "../../constants/theme";


export default props => {
  const { onChange, customStyle } = props

  const handleOnChange = e => {
    onChange(e)
  }

  return (
    <TextInput
      underlineColorAndroid={'transparent'}
      onChangeText={handleOnChange}
      placeholderTextColor={theme.color.greyLight}
      // clearTextOnFocus
      returnKeyType='done'
      {...props}
      style={[styles.textInput, customStyle]}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderStyle: 'solid',
    borderBottomColor: theme.color.greyLight,
    borderBottomWidth: 1,
    color: theme.color.blueLightest,
    fontSize: 20,
  },
})
