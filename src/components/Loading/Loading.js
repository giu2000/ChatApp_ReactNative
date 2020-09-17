import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const Loading = () => {
    return(
        <ActivityIndicator 
            style={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Loading;