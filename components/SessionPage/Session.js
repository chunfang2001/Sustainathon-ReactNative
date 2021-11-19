import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import SessionChoice from './SessionChoice'
import { Divider } from 'react-native-elements';
import Header from '../UI/Header';

export default function Session({ navigation: nav}) {
    return (
        <View style={styles.container}>
            <Header>Session</Header>
            <Divider orientation="horizontal" width={3}/>
            <ScrollView style={styles.scroll}>
                <SessionChoice title="hello1" nav={nav}/>
                <SessionChoice title="hello2" nav={nav}/>
                <SessionChoice title="hello3" nav={nav}/>
                <SessionChoice title="hello4" nav={nav}/>
                <SessionChoice title="hello5" nav={nav}/>
                <SessionChoice title="hello6" nav={nav}/>
                <SessionChoice title="hello7" nav={nav}/>
                <SessionChoice title="hello8" nav={nav}/>
                <SessionChoice title="hello9" nav={nav}/>
                <SessionChoice title="hello10" nav={nav}/>
            </ScrollView>
            <Divider orientation="horizontal" width={3}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        backgroundColor:'#dacfe5'
    },
    scroll:{
        padding:10,
        flex:1,
        width:'100%'
    }
})
