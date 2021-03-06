import React, { useState } from 'react';
//Modale per aggiungere un anuova chat
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper'
import { FormButton, FormInput } from '../../components';
import { firebase } from '../../firebase/config';
import { useStatusBar } from '../../utils';


const AddRoomScreen = ({navigation}) => {
    const [roomName, setRoomName] = useState("");
    useStatusBar('dark-content');

    const handleButtonPress = () => {
        if(roomName.length > 0 ){
            firebase
            .firestore()
            .collection("THREADS")
            .add({
                name: roomName,
                latestMessage: {
                    text: `You have joined the chat ${name}`,
                    createdAt: new Date().getTime()
                }
            })
            .then(docRef =>{  //aggiungo un messaggio di sistema nel momento in cui viene creata la chat room
                docRef.collection('MESSAGES')
                .add({
                    text: `You have joined the chat ${name}`,
                    createdAt: new Date().getTime(),
                    system: true
                })
                navigation.navigate('HomeScreen');
                console.log('add room screen- schat added', roomName)

            })
            .catch(error => console.log(error))
        }
    }
    return(
        <View style={styles.container}>
            <Text>Add new chat room</Text>
            <IconButton 
                icon='close-circle'
                color='#ffffff'
                size={28}
                style={styles.icon}
                onPress={()=>navigation.goBack()}
            />
            <FormInput 
                label='Add new Chat room'
                value={roomName}
                onChangeText={text => setRoomName(text)}
            />
            <FormButton 
                mode='contained'
                title='Add new room'
                onPress={() => handleButtonPress()}
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
    icon:{
        position:'absolute',
        top:30,
        right:1
    }
})

export default AddRoomScreen;