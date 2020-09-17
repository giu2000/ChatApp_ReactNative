//questo file gestisce tutte le rotte di registrazione e login
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegistrationScreen} from '../../screens';


/*createStackNavigator crea un navigator stack che consente la navigazione tra le pagine di un app
L'oggetto ritornato ha come prop 2 componenti React,, Navigator e Screen che ci permettono di configurare ogni screen
*/
const { Navigator, Screen } = createStackNavigator();

const AuthenticationStack = () => {
    return(
        <Navigator
            initialRouteName='LoginScreen'
            headerMode='none'
        >
            <Screen 
                name='LoginScreen'
                component={ LoginScreen }
            />
            <Screen 
                name='RegistrationScreen'
                component={ RegistrationScreen }
            />
        </Navigator>
    )
}

export default AuthenticationStack;