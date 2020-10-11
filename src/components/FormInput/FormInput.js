import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

const FormInput = ({ label, ...rest }) => {
    const { width, height } = useWindowDimensions();
    return (
        <TextInput
            label={label}
            style={{ width: width / 1.5, height: height / 15, ...styles.input }}
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        marginBottom: 10,

    }
})
export default FormInput;