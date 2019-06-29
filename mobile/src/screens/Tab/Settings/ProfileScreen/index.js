import React, { Component } from 'react';
import { ScrollView, Image, } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { inject } from 'mobx-react/native';
import {
  MaterialIcons,
  EvilIcons,
  Ionicons,
  Feather,
} from '@expo/vector-icons';


import CloseBtn from '../../commons/CloseBtn';
import ListColumn from '../../commons/ListColumn';
import { theme } from '../../constants/theme';
import { MyButton } from "../../commons/MyButton";

const baseIconStyle = {
  size: 25,
  color: theme.color.grey,
};

const LINKS = [
  {
    link: 'Share',
    title: 'Invite friends',
    icon: <EvilIcons name="share-apple" {...baseIconStyle} />,
  },
  {
    link: 'Help',
    title: 'Help',
    icon: <Ionicons name="ios-help-circle-outline" {...baseIconStyle} />,
  },
  {
    link: 'About',
    title: 'About this app',
    icon: <Ionicons name="ios-information-circle-outline" {...baseIconStyle} />,
  },
  {
    link: 'Settings',
    title: 'Your accounts settings',
    icon: <Feather name="settings" {...baseIconStyle} />,
  },
];

@inject('authStore')
class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'My Profile',
    headerLeft: <CloseBtn left size={32} onPress={() => navigation.goBack(null)} /> ,
  });

  render() {
    const { authStore } = this.props;
    return (
      <Box f={1} bg="white">
        <ScrollView>
          <ListColumn>
            <ListColumn.Left>
              <Text size="xl" bold>
                Hi, {authStore.info.firstName}
              </Text>
            </ListColumn.Left>
            <ListColumn.Right>
              <Box circle={70} avatar>
                <Image source={{ uri: authStore.info.avatarUrl }} />
              </Box>
            </ListColumn.Right>
          </ListColumn>
          {LINKS.map(el => (
            <ListColumn link={el.link} key={el.title}>
              <ListColumn.Left>
                <Box dir="row" >
                  <Box f={0.2}>{el.icon}</Box>

                  <Box f={1}>
                    <Text>{el.title}</Text>
                  </Box>
                </Box>
              </ListColumn.Left>
              <ListColumn.Right>
                <MaterialIcons name="keyboard-arrow-right" {...baseIconStyle} />
              </ListColumn.Right>
            </ListColumn>
          ))}
        </ScrollView>

        <MyButton 
          type='success' 
          style={{borderRadius: 6, height: 40, width: '90%', marginBottom: 20,}} 
          onPress={ () => this.props.authStore.logOut() }
        >
          <Box center f={1}>
            <Text bold color="black">
                Log out
            </Text>
          </Box>
        </MyButton>

      </Box>
    );
  }
}

export default ProfileScreen;
