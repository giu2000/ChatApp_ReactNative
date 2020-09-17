import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Routes } from '..';
import { AuthenticationProvider } from '../AuthenticationProvider/AuthenticationProvider';


/*Per far funzionare tutti i componenti dell'interfaccia react-native-paper dobbiamo racchiudere tutti i percorsi all'interno di un PaperProvider
PaperProvider fornisce un tema a tutti i componenti che devono essere renderizzati al livelo più alto
*/

//Per fare in modo che i componenti LoginScreen e RegisterScreen abbiano accesso allo statod ell'utente dobbiamo avvolger Routes con AuthenticationProvider
const Providers = () => {
    return(
        <PaperProvider>
            <AuthenticationProvider>
                <Routes />
            </AuthenticationProvider>
        </PaperProvider>
    )
}

export default Providers;