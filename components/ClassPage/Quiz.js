import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export default function Quiz() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Quiz</Text>
            </View>
            <ScrollView style={styles.quizContainer}>
                <View>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        backgroundColor:'purple',
        width:'100%',
        alignItems:'center',
        flexDirection:'column',
        padding:10
    },
    title:{
        fontSize:25,
        color:'white',
        fontWeight:'bold'
    },
    quizContainer:{
        flex:1,
    }
})
