//schermata iniziale dove verranno elencate tutte le chat app
import React, { useContext, useState, useEffect } from 'react';
import { firebase } from '../../firebase/config';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Title, List } from 'react-native-paper';
import { FormButton } from '../../components';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthenticationContext } from '../../navigation/AuthenticationProvider/AuthenticationProvider';



const HomeScreen = ({navigation}) => {
    const { logout } = useContext(AuthenticationContext);
    const [ threads, setThreads ] = useState([]);
    const [ loading, setLoading ] = useState('true');

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection("THREADS")
            .onSnapshot(querySnapshot => {
                console.log('Total docs', querySnapshot.size)
                querySnapshot.forEach(documentSnaphot => {
                    console.log('docId', documentSnaphot.id)
                })
                const threads = querySnapshot.docs.map(documentSnaphot => {
                    return {
                         _id: documentSnaphot.id,
                         name: documentSnaphot.name,
                         ...documentSnaphot.data()
                     }
                 })
                 setThreads(threads);
                 if(loading) setLoading(false);
            })

            return () => unsubscribe();
    }, [])
    console.log('threads home screen', threads);
    console.log('threads type', typeof(threads))
    

    return(
        <View style={styles.container}>
            <Title>Home (Chat List) </Title>
            <Text>All chat will be listed here </Text>
            <FlatList
                data={threads}
                style={styles.flatList}
                
                keyExtractor={item => item._id}
                renderItem={ ({item}) => (
                         <TouchableOpacity
                            onPress={() => navigation.navigate('RoomScreen', {thread:item})} //in questo modo passo l'intero oggetto thread alla schermata RoomScreen. In RoomScreen posso poi usare route.params per recuperare l'intero thread
                         >
                            <List.Item
                                style={styles.listItem}
                                title={item.name}
                                titleStyle={styles.titleItem}
                                description={'doc descripton'}
                                descriptionNumberOfLines={1}
                            />
                         </TouchableOpacity>
                    )
                }
            />
           
            <FormButton 
                mode='contained'
                title='logout'
                onPress={() => logout() }
            />

        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f5f5f5'
    },
    flatList:{
        width:"100%"
    },
    titleItem:{
        fontSize:22
    }
})


export default HomeScreen;




