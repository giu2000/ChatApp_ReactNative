import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, RoomScreen } from '../../screens';
import { IconButton } from 'react-native-paper';

const {Navigator: ChatAppStackNavigator, Screen: ChatAppStackScreen } = createStackNavigator();

const ChatAppStack = () => {
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