import React, { useContext }from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, RoomScreen } from '../../screens';
import { IconButton } from 'react-native-paper';
import { AuthenticationContext } from '../AuthenticationProvider/AuthenticationProvider';

const {Navigator: ChatAppStackNavigator, Screen: ChatAppStackScreen } = createStackNavigator();

const ChatAppStack = () => {
    const {logout} = useContext(AuthenticationContext)
    return(
        <ChatAppStackNavigator
            screnOptions={
                {
                    headerStyle:{
                        backgroundColor:'#6646ee'
                    },
                    headerTintColor:'#ffffff',
                    headerTitleStyle:{
                        fontSize:22
                    }
                }
            }
        >
            <ChatAppStackScreen
                name='HomeScreen'
                component={HomeScreen} 
                options={({navigation}) => ({
                    headerRight: () => (
                        <IconButton 
                            icon='message-plus'
                            size={28}
                            color='#ee467a'
                            onPress={() => navigation.navigate('AddRoomScreen')}
                        />
                    ),
                    headerLeft: () => (
                        <IconButton 
                            icon='logout-variant'
                            size={28}
                            color='#ee467a'
                            onPress={() => logout()}
                        />
                    )
                })
            
            }
            />
            <ChatAppStackScreen 
                name='RoomScreen'
                component={RoomScreen}
                options={({route}) => ({
                    title: route.params.thread.name
                })}
            />
        </ChatAppStackNavigator>
    )
}

export default ChatAppStack;