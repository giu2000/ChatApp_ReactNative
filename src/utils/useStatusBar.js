import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'react-native';

const useStatusBar = (style, animated=true) => {
    useFocusEffect( 
        useCallback(() => { //uso questo per evitare l'effect dopo ogni rerendering quando lo schermo è a vuoto
            StatusBar.setBarStyle(style)
        }, [])
    )
}

export default useStatusBar;