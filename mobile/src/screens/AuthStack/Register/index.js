import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import BuddhismIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Input, Modal, Wrapper, Button } from '../../../components/index'
import { theme } from "../../../constants/theme";

export default class Register extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       email: null,
       password: null,
       isRegistering: false,
       registerError: null,
       sentConfirmEmail: false,
       isShowModal: false
    }
  }
  
  _onToggleModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal })
  }

  _onRegisterUser = async () => {
    const { email, password } = this.state
    // try {
    //     this.setState({ isRegistering: true })
    //     await auth.createUserWithEmailAndPassword(email, password)
    //     await auth.currentUser.sendEmailVerification()

    //     this.setState({
    //       isRegistering: false,
    //       sentConfirmEmail: true
    //     })
    //     this._onToggleModal()
    // } catch (error) {
    //   console.log('Register user error', error)
    //   this.setState({
    //     registerError: error,
    //     isRegistering: false
    //   })
    //   this._onToggleModal()
    // }
  }

  _onRenderInputFiled() {
    return (
      <View style={styles.textInputWrapper}>
        {/* Email */}
        <Input
          placeholder='Email'
          placeholderTextColor={colors.whiteTransPrimary}
          onChange={email => this.setState({ email })}
        />
        {/* Password */}
        <Input
          placeholder='Password'
          placeholderTextColor={colors.whiteTransPrimary}
          onChange={password => this.setState({ password })}
          secureTextEntry
          customStyle={styles.input}
        />
        {/* Button */}
        <Button
         onPress={() => this._onRegisterUser()}
         btnStyle={styles.input}
        >
          Register
        </Button>
      </View>
    )
  }

  render() {
    const { isRegistering } = this.state
    console.log('IS REGISTEING', isRegistering)
    return (
     <Wrapper
      isLoading={isRegistering}
      customStyle={styles.container}
     >
       <Text style={styles.title}>Welcome Hutech Student</Text>

       <BuddhismIcon
          name={'buddhism'}
          color={theme.color.white}
          size={100}
       />

       {this._onRenderInputFiled()}
       {this._onRenderModal()}
     </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    backgroundColor: theme.color.blueLightest
  },
  title: {
    fontSize: 35,
    fontWeight: '600',
    color: theme.color.white,
    letterSpacing: 3,
    marginBottom: 20
  },
  textInputWrapper: {
    width: '85%',
    marginTop: 50
  },
  input: {
    marginTop: 30
  }
})