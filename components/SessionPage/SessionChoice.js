import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function SessionChoice(props) {
    return (
        <TouchableOpacity style={styles.container} onPress={()=>{
            props.nav.navigate('Class')
        }}>
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        marginBottom:10,
        padding:20,
        flexDirection:'column',
        alignItems:'center'
    },
    title:{
        fontSize:20,
    }
})
