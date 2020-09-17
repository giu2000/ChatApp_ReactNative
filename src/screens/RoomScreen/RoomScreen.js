import React, {useState, useContext, useEffect } from 'react';
import { GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native'
import { Loading } from '../../components';
import { AuthenticationContext } from '../../navigation/AuthenticationProvider/AuthenticationProvider';
import { firebase } from '../../firebase/config';



const RoomScreen = ({route}) => {
    const { user } = useContext( AuthenticationContext );
    const currentUser = JSON.stringify(user);
    const { thread } = route.params; // ottengo l'oggetto thread relativo a questa specifica chat room
    
    const [messages, setMessages] = useState([
        /**Mock messages data */

        /**example of system message */
        {
            _id: 0,
            text: 'New room created at',
            createdAt: new Date().getTime(),
            system: true 
        },
        
        /***example of user chat message */
        {
            _id:1,
            text:"Hello",
            createdAt: new Date().getTime(),
            user:{
                _id:2,
                name:"Test User"
            }
        }
      
    ])
    useEffect(() => {
        console.log('i am in room screen', thread)
        console.log('i am in room screen', currentUser)
    
    }, []);
  

    const  handleSend = async (newMessages=[]) => {
        const textToAdd = newMessages[0].text;
        const threadRef = firebase
            .firestore()
            .collection('THREADS')
            .doc( thread._id);
            try {
                await threadRef

                    .add({
                        text: textToAdd,
                        createdAt: new Date().getTime(),
                        user: {
                            _id: user.uid,
                            email: user.email
                        }
                    })
            }catch(error){console.log(error)}

        setMessages(GiftedChat.append(messages, newMessages));
        console.log('message sent');

        try {
            await threadRef
                .collection('MESSAGES')
                .set({
                    latestMessage: {
                        text: textToAdd,
                        createdAt: new Date().getTime()
                    }
                },{
                    merge: true
                })
                console.log("latest message sent")
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
            onSend={newMessage => handleSend(newMessage)}
            user={{_id:1}}
            isTyping={true}
            placeholder={"Type your message here"}
            alwaysShowSend={true}
            renderBubble={renderBubble}
            showUserAvatar={true}
            renderSend={renderSend}
            scrollToBottom={true}
            scrollToBottomComponent={scrollToBottomComponent}
            renderLoading={renderLoading}
        />
    )
}

const styles = StyleSheet.create({
    sendingContainer:
    {
        justifyContent:'center',
        alignItems: 'center'
    }
})

export default RoomScreen;