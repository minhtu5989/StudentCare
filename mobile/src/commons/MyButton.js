import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box } from 'react-native-design-utility'

export class MyButton extends Component {
    getAdditionalStyle(){
        const { type } = this.props;
        switch (type) {
            case 'success':
                return { backgroundColor: '#25c73a', borderColor: '#3EA552', borderWidth: 1 };
        
            case 'danger':
                return { backgroundColor: '#ff564e', borderColor: '#FF0000', borderWidth: 1};
    
            case 'warning':
                return { backgroundColor: '#FFCC00' , borderColor: '#ffb827', borderWidth: 1 };
            
            case 'primary':
                return { backgroundColor: '#0099FF', borderColor: '#6aa3da', borderWidth: 1 };

            case 'image': 
                return { backgroundColor: 'transparent', borderWidth: 0 }

            default:
                return { backgroundColor: 'transparent', borderWidth: 0 };
        }
    }
    
    render() {
        const { children, ref, style, disabled, disabledStyle, ...rest } = this.props;
        const additionalStyle = this.getAdditionalStyle();
        const _style = [styles.button]
        if(disabled){
            _style.push(disabledStyle)
        }
        else {
            _style.push(style)
        }
        return  (
                <TouchableOpacity
                    {...rest}  
                    ref={ref}
                    style={[ additionalStyle, _style ]} 
                    disabled={disabled}
                >
                    <Box center f={1}>
                        {children}
                    </Box>
                </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height:50, 
        width:200, 
        alignSelf:'center', 
        borderRadius: 6,
    }
})
