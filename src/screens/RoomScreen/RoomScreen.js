import React, {useState, useContext, useEffect } from 'react';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native'
import { Loading } from '../../components';
import { AuthenticationContext } from '../../navigation/AuthenticationProvider/AuthenticationProvider';
import { firebase } from '../../firebase/config';
import { useStatusBar } from '../../utils';


const RoomScreen = ({route}) => {
    const { user } = useContext( AuthenticationContext );
    console.log('user from context', user)
    console.log('user type from context', typeof(user))
    const currentUser = JSON.stringify(user);
    console.log('parsed user Json', user)
    const { thread } = route.params; // ottengo l'oggetto thread relativo a questa specifica chat room
    
    const [messages, setMessages] = useState([
        /**Mock messages data */

        /**example of system message */
        // {
        //     _id: 0,
        //     text: 'New room created at',
        //     createdAt: new Date().getTime(),
        //     system: true 
        // },
        
        // /***example of user chat message */
        // {
        //     _id:1,
        //     text:"Hello",
        //     createdAt: new Date().getTime(),
        //     user:{
        //         _id:2,
        //         name:"Test User"
        //     }
        // }
      
    ])

    useStatusBar('light-content');

    useEffect(() => {
        const messagesListener = firebase
                .firestore()
                .collection('THREADS') //raccolta THREADS
                .doc(thread._id) //documento relativo alla chat di questa room
                .collection('MESSAGES') //sottoraccolta message
                .orderBy('createdAt', "desc")
                .onSnapshot(querySnapshot => {
                    querySnapshot.forEach(doc => console.log('message text', doc._text))
                    const messages = querySnapshot.docs.map(doc => {
                        const messageData = {
                            _id: doc.id,
                            text: doc._text,
                            createdAt: doc.createdAt,
                            ...doc.data()
                        };
                        if (!messageData.system) {
                            messageData.user = {
                                ...doc.data().user,
                                name: messageData.user.email
                            }
                        }
                        return messageData;
                    });
                    setMessages(messages);
                    console.log('messages from firestore sub collection', messages)
                })
        
        return () => messagesListener();
            
        
    }, []);
  

    const  handleSend = async (messages) => { //messages è un array
        const textToAdd = messages[0].text; //testo di ogni messaggio inviato dall'utente
        console.log('handle send - textToAdd:', textToAdd)
        console.log('handle send - currentUser-id', user.uid)
        console.log('handle send - current user email ', user.email)
        const threadRef = firebase
            .firestore()
            .collection('THREADS')
            .doc( thread._id);
        debugger
        //archivio le conversazioni in una sottoraccolta
        try {
            await threadRef
                .collection('MESSAGES')
                .add({
                    text: textToAdd,
                    createdAt: new Date().getTime(),
                    user: {
                        _id: user.uid,
                        email: user.email
                    }
                })
        }catch(error){console.log(error)}

        
        console.log('handleSend - new message added in MESSAGES sub collection');

        //aggiungo alla raccolta THREADS un nuovo campo chiamato 'latestMessage', che rapp l'ultimo mess che era stato inviato in quella chat room
        try {
            await threadRef
                .set({
                    latestMessage: {
                        text: textToAdd,
                        createdAt: new Date().getTime()
                    }
                },{
                    merge: true
                })
                console.log("handle send - latest message add to threads colelction")
        }catch(error){console.log(error)}
    }

    const renderBubble= props => {
        return(
            <Bubble 
                wrapperStyle={{
                    right: {
                        backgroundColor: '#6646ee'
                    }
                }}
                textStyle={{
                    right:{
                        color:'#ffffff'
                    }
                }}
                {...props}
            />
        )
    }
    const renderSend= props => {
        return(
            <Send
                {...props}
            >
                <View
                    style={styles.sendingContainer}
                >
                    <IconButton
                        icon="send-circle-outline"
                        size={32}
                    />
                </View>
            </Send>
        )
    }

    const renderSystemMessage = props => {
        return (
            <SystemMessage
                {...props}
                wrapperStyle={styles.systemMessageWrapper}
                textStyle={styles.systemMessageText}
            
            />)
    }

    const scrollToBottomComponent = () => {
        return(
            <View>
                <IconButton
                    icon="chevron-double-down"
                    size={32}
                />
            </View>
        )
    }

    const renderLoading = () => {
        return(
            <Loading />
        )
    }

    return(
        <GiftedChat 
            messages={messages}
            onSend={handleSend}
            // user={{_id:currentUser.uid}}
            user={{_id:user._id}}
            isTyping={true}
            placeholder={"Type your message here"}
            alwaysShowSend={true}
            renderBubble={renderBubble}
            showUserAvatar={true}
            renderSend={renderSend}
            scrollToBottom={true}
            scrollToBottomComponent={scrollToBottomComponent}
            renderLoading={renderLoading}
            renderSystemMessage={renderSystemMessage}
        />
    )
}

const styles = StyleSheet.create({
    sendingContainer:
        {
            justifyContent:'center',
            alignItems: 'center'
        },
    systemMessageWrapper:   
        {
            backgroundColor:'#6646ee',
            borderRadius: 4,
            padding:5
        },
    systemMessageText:
        {
            fontSize:14,
            fontWeight: 'bold',
            color:'#ffffff'
        }
})

export default RoomScreen;