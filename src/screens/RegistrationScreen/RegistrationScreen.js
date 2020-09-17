import React, {useState, useContext} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { FormInput, FormButton } from '../../components';
import { AuthenticationContext } from '../../navigation/AuthenticationProvider/AuthenticationProvider';


const RegistrationScreen = ({navigation}) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { register } = useContext(AuthenticationContext)
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Registration Page</Text>
            <FormInput 
                label='Enter email'
                value={ email }
                onChangeText={userEmail => setEmail(userEmail)}
            />
            <FormInput 
                label='Enter password'
                value={password}
                onChangeText={userPassword => setPassword(userPassword)}
            />
            <FormButton 
                title='register'
                mode='contained'
                style={styles.registerButton}
                onPress={() => {
                    register(email,password);
                    console.log('user registerd', email)
                    alert('registered')
                }}
            />
            <IconButton
                icon='keyboard-backspace'
                size={30}
                style={styles.backButton}
                color='#6646ee'
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:22,
        fontWeight:'bold'
    },
    registerButton:{
        textTransform:'uppercase'
    },
    backButton:{
        marginTop:10
    }

})
export default RegistrationScreen;