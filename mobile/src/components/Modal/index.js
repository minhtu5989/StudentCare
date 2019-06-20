import React from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import { Button } from '../index'
import { theme } from "../../constants/theme";

const BModal = ({ isVisible, message, onPress }) => (
  <Modal
    visible={isVisible}
    transparent
    onRequestClose={onPress}
  >
  <View style={styles.modalWrapper}>
      <View style={styles.modalBox}>
        <Text style={styles.modalMess}>{message}</Text>
        <Button
          btnStyle={styles.modalBtn}
          txtStyle={{ color: theme.color.white }}
          onPress={onPress}
        >
          OK
        </Button>
      </View>
  </View>

  </Modal>
)

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: theme.color.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    backgroundColor: theme.color.white,
    width: '90%',
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  modalMess: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  modalBtn: {
    backgroundColor: theme.color.danger,
    width: '50%',
    marginTop: 20,
  }
})

export default BModal