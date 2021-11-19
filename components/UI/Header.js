import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Header(props) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.children}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    header:{
        padding:10,
        backgroundColor:'purple',
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        elevation:20
    },
    title:{
        fontSize:25,
        color:'white',
        fontWeight:'bold'
    },
})