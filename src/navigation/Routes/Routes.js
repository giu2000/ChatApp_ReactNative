import React, {useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationStack, HomeStack } from '..';
import { AuthenticationContext } from '../AuthenticationProvider/AuthenticationProvider';
import {firebase} from '../../firebase/config';
import { Loading } from '../../components';

/*Questo file contiene tutti gli stack dell'app e contiene il NavigationContainer che è un
componente che gestisce l'albero di navigazione
*/

const Routes = () => {

    const { user, setUser } = useContext(AuthenticationContext) //retrive user e setuser dal valore della context
    const [ loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = user => {
        setUser(user);
        console.log('i am in routes', user)
        if(initializing) setInitializing(false);
        setLoading(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; //unsubscribe on unmount
    })

    if(loading) <Loading />
    return(
        <NavigationContainer>
            {user ? <HomeStack /> : <AuthenticationStack />}
        </NavigationContainer>
    )
}

export default Routes;

// da scrivere dentro NavigationContainer: {user ? <HomeStack /> : <AuthenticationStack />}