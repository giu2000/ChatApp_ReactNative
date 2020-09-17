import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native'
import { Button } from 'react-native-paper';

const FormButton = ({title, mode, ...rest}) => {
    const { width, height } = useWindowDimensions()
    return(
        <Button 
            mode={mode}
            { ...rest}
            style={styles.button}
            contentStyle={{width: width /2, height: height / 15}}
        >
            {title}
        </Button>
    )
}


const styles=StyleSheet.create({
    button: {
        marginTop:10
    }
})

export default FormButton;