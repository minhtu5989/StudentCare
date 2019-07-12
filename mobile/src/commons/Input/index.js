import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { theme } from "../../constants/theme";

export default class MyTextInput extends Component {
  render() {
    const { style, ...props } = this.props
    return (
      <TextInput
        autoCapitalize='none'
        underlineColorAndroid={'transparent'}
        placeholderTextColor={theme.color.greyLight}
        clearTextOnFocus
        // clearButtonMode='unless-editing'
        returnKeyType='done'
        {...props}
        style={[styles.textInput, style]}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderStyle: 'solid',
    borderBottomColor: theme.color.greyLight,
    borderBottomWidth: 1,
    color: theme.color.blueLightest,
    fontSize: 20,
    margin: 10,
  },
})
