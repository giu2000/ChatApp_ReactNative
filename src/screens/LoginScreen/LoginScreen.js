import React, {useState, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FormInput, FormButton } from '../../components';
import { AuthenticationContext } from '../../navigation/AuthenticationProvider/AuthenticationProvider';




const LoginScreen = ({navigation}) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { login } =useContext(AuthenticationContext)
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Chat app</Text>
            <FormInput
                label='Email'
                value={email}
                onChangeText={userEmail => setEmail(userEmail)}
            />
            <FormInput
                label='Password'
                value={password}
                onChangeText={userPassword => setPassword(userPassword)}
            />
            <FormButton 
                title='login'
                mode='contained'
                onPress={() => {
                    login(email, password);
                    alert('login');
                }}
            />
            <FormButton 
                title='New user? Join here'
                mode='text'
                labelStyle={styles.buttonNewUser}
                onPress={() => {
                    console.log('logged')
                    navigation.navigate('RegistrationScreen')}}
            />
        </View>
    )

}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    buttonNewUser:{
        fontWeight:'bold',
        fontSize:14,
        textTransform:'lowercase'
    }
})
export default LoginScreen;