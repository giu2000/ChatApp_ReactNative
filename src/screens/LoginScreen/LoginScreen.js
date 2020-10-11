import React, { useContext } from 'react';
import { Text, View, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { FormInput, FormButton} from '../../components';
import { AuthenticationContext } from '../../navigation/AuthenticationProvider/AuthenticationProvider';

const LoginScreen = ({ navigation }) => {
    const { login, errorFromFirebase } = useContext(AuthenticationContext);
    const {control, handleSubmit, errors } = useForm();
    const { width } = useWindowDimensions();

    const alert = () =>{
        Alert.alert(
            "",
            "E-mail or password is not correct",
            [{
                text: 'OK',
                onPress: () => console.log('OK pressed')
            }],

        )}

    const onSubmit= data => {
        const { email, password } = data;
        errorFromFirebase? alert():login(email, password);
        console.log('login pressed');
        console.log(errors)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Chat app</Text>
            <Controller 
                control={control}
                render={({onChange, onBlur, value}) => (
                    <FormInput 
                        label='Email'
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                    />
                )}
                name='email'
                rules={{ required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }}
                defaultValue=""
            />
            {errors.email?.type === 'required' && <Text style={{...styles.errorMessage, width:width/1.5}}>mail required</Text>}
            {errors.email?.type === 'pattern' && <Text style={{ ...styles.errorMessage, width: width / 1.5 }}>mail not valid</Text>}
            
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <FormInput
                        label='Password'
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name='password'
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.password && <Text style={{ ...styles.errorMessage, width: width / 1.5 }}>Password required</Text>}
            
            <FormButton
                title='login'
                mode='contained'
                onPress={handleSubmit(onSubmit)}
            />
            <FormButton
                title='New user? Join here'
                mode='text'
                labelStyle={styles.buttonNewUser}
                onPress={() => {
                    console.log('moved to registrationScreen')
                    navigation.navigate('RegistrationScreen')
                }}     
            />
       </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    buttonNewUser: {
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'lowercase'
    },
    errorMessage:{
        fontSize: 14,
        color:'red',
      
    }
})
export default LoginScreen;
