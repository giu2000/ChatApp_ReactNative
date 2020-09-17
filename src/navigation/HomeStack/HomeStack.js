//qui vengono gestite tutte le rotte che sono disponibili dopo che l'utente si è autenticato

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens';
import ChatAppStack from './ChatAppStack';
import { AddRoomScreen } from '../../screens';

const { Navigator: HomeStackNavigator, Screen: HomeStackScreen } = createStackNavigator();
const { Navigator: ModalStackNavigator, Screen: ModalStackScreen } = createStackNavigator();

// const HomeStack = () => {
//     return(
//         <HomeStackNavigator
//             screenOptions={
//                 {
//                     headerStyle:{
//                         backgroundColor:'#6646ee'
//                     },
//                     headerTintColor:'#ffffff',
//                     headerTitleStyle:{
//                         fontSize:22
//                     }
//                 }
//             }
//         >
//             <HomeStackScreen 
//                 name='HomeScreen'
//                 component={HomeScreen}
//             />
//         </HomeStackNavigator>
//     )
// }

const HomeStack = () => {
    return (
        <ModalStackNavigator
            mode='modal'
            headerMode='none'
        >
            <ModalStackScreen 
                name='ChatAppStack'
                component={ChatAppStack}
            />
            <ModalStackScreen 
                name='AddRoomScreen'
                component={AddRoomScreen}
            />
        </ModalStackNavigator>
    )
}

export default HomeStack;