import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi, Sae } from 'react-native-textinput-effects';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window')


const saeInput = 
<Sae
    value={this.steetName}

    label='Địa chỉ nhà:'
    iconClass={FontAwesomeIcon}
    iconName={'road'}
    iconColor={theme.color.blue}
    autoCapitalize={'none'}
    autoCorrect={false}
    underlineColorAndroid='transparent'
    returnKeyType='done'
    keyboardType='visible-password'
    maxLength = {100}
    multiline
    blurOnSubmit={false}
    clearTextOnFocus={true}
    style={styles._style}
    labelStyle={styles._labelStyle}
    inputStyle={styles._inputStyle}
/>

const styles = StyleSheet.create({
    _labelStyle:{
        color: theme.color.blue,
        padding: 5,

    },
    _style:{
        backgroundColor: theme.color.greyLightest,
        borderRadius: 5,
        marginTop: 8,
    },
    _inputStyle:{
        paddingHorizontal: 10,
        color: 'black',
    }
})








const FumiInput = 

    <Box center shadow={1}>
        <Fumi
            label={'Course Name'}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='done'
            keyboardType='visible-password'
            value={this.state.txtPassword} 
            onChangeText={ txtPassword => this.setState({ txtPassword }) }
            maxLength = {30}
            multiline
            ref='secondInput'
            // onSubmitEditing={this.onLogIn}
            blurOnSubmit={false}
            clearTextOnFocus={true}
            labelStyle={{ color: 'black', fontSize: 13 }}
            inputStyle={{ color: '#1565c0', marginTop: 5, }}
            iconClass={FontAwesomeIcon}
            iconName={'university'}
            iconColor={'red'}
            iconSize={20}
            style={{
                width: width-50,
                height: 65,
                backgroundColor: 'white',
                borderRadius: 10,
            }}
        />
    </Box>