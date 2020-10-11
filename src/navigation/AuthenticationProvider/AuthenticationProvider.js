//creaiamo un provider di autenticazione per verificare se l'utente è loggato o meno e loggarsi nel caso
//esportando questo provider permetto agli latri componenti di accedere allo stato dello user corrente

import React, { createContext, useState } from 'react'
import {firebase} from '../../firebase/config';

export const AuthenticationContext = createContext({}) //creo il valore della context, AuthenticationContext.Provider, AuthenticationContext.Consumer

export const AuthenticationProvider = ({children}) => {
    const [ user, setUser ] = useState(null);
    const [errorFromFirebase, setErrorFromFirebase ] = useState({})

    return(
        <AuthenticationContext.Provider
            value={
                {
                    user,
                    setUser,
                    errorFromFirebase,
                    login: async (email, password) => {
                        try{
                            await firebase.auth().signInWithEmailAndPassword(email, password)
                            console.log('authentication provider-email', email)
                            console.log('authentication provider-password', password)
                            
                        }catch(error){
                            console.log('authentication provider-errorFromFirebase', errorFromFirebase);
                            setErrorFromFirebase(error);
                            
                        }
                    },
                    register: async (email, password) => {
                        try{
                            await firebase.auth().createUserWithEmailAndPassword(email, password)
                        }catch(error){
                            console.log(error)
                        }
                    },
                    logout: async () => {
                        try{
                            await firebase.auth().signOut()
                        }catch(error){
                            console.log(error)
                        }
                    }
                }
            }
        >
            {children}
        </AuthenticationContext.Provider>
    )
}