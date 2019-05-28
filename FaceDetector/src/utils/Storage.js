import React, { Component } from 'react'
import {AsyncStorage} from 'react-native'

export default class Storage extends Component {

    static setData = async (key,value) => {
        try {
          await AsyncStorage.setItem(key,value);
        } catch (error) {
          console.log("Storage.setData", error);
        }
    };
    

    static getData = async (key) => {
      let value =  ''
      try {
          value = await AsyncStorage.getItem(key);
          if (value !== null) {
            console.log("Value",value);
          }
        } catch (error) {
          console.log("Storage.getData", error);
        }
      return value;
    };
    
    static deleteData = async(key) => {
      try {
        await AsyncStorage.removeItem(key);
        return true;
      }
      catch(exception) {
        return false;
      }
    }
}


