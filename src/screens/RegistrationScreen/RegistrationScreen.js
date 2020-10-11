import React, {useContext} from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { FormInput, FormButton } from '../../components';
import { AuthenticationContext } from '../../navigation/AuthenticationProvider/AuthenticationProvider';


const RegistrationScreen = ({navigation}) => {
    const { register } = useContext(AuthenticationContext)
    const { control, handleSubmit, errors, watch} = useForm();
    const watchPassword = watch('password', '');
    const { width } = useWindowDimensions();

    const onSubmit = data => {
        const { email, password } = data;
        register(email, password);
        console.log('register pressed');
        console.log(errors);
    }
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Registration Page</Text>
            <Controller 
                control={control}
                render={({onChange,onBlur,value}) => (
                    <FormInput 
                        label='Enter email'
                        onBlur={onBlur}
                        value={value}
                        onChangeText={value=>{
                            onChange(value);
                            }
                        }
                    />
                )}
                name='email'
                rules={{ required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}}
                defaultValue=""
            />
            
            {errors.email?.type === 'required' && <Text style={{ ...styles.errorMessage, width: width / 1.5 }}>Mail required </Text>}
            {errors.email?.type === 'pattern' && <Text style={{ ...styles.errorMessage, width: width / 1.5 }}>Mail not valid </Text>}
            <Controller 
                control={control}
                render={({onChange,onBlur,value}) => (
                    <FormInput
                        label='Enter password'
                        onBlur={onBlur}
                        value={value}
                        onChangeText={value =>{ 
                            onChange(value)
                            }
                        }
                    />
                )}
                name='password'
                rules={{ required: true, pattern: /(?=\w{8,})/}} //pw di almeno 8 caratteri
                defaultValue=""
            />
            {errors.password?.type === 'required' && <Text style={{...styles.errorMessage, width:width/1.5}}>Password required</Text>}
            {errors.password?.type === 'pattern' && <Text style={{ ...styles.errorMessage, width: width / 1.5 }}>Password not valid</Text>}
            <Text style={{width: width/1.5, fontStyle:'italic', color:'grey'}}>Password must have almost 8 characters</Text>
            <Controller  
                control={control}
                render={({onChange, onBlur, value}) => (
                    <FormInput 
                        label='Confirm your password'
                        onBlur={onBlur}
                        value={value}
                        onChangeText={value => {
                            onChange(value)
                        }}
                    />
                )}
                name='confirmPassword'
                rules={{required:true, validate: value => value === watchPassword}}
                defaultValue="" 
            />
            {errors.confirmPassword?.type === 'validate' && <Text style={{...styles.errorMessage, width:width/1.5}}>Password not equal</Text>}
            {errors.confirmPassword?.type === 'required' && <Text style={{ ...styles.errorMessage, width: width / 1.5 }}>Field required</Text>}
            
            <FormButton 
                title='register'
                mode='contained'
                style={styles.registerButton}
                onPress={handleSubmit(onSubmit)}
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
    },
    errorMessage:{
        fontSize:14,
        color:'red',
        marginBottom:10
    }

})
export default RegistrationScreen;
