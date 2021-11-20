import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { sessionSliceAction } from '../../store/sessionSlice'

export default function SessionChoice(props) {
    const dispatch = useDispatch()
    const changeSessionHandler=(id)=>{
        dispatch(sessionSliceAction.changeSession({
            id:id
        }))
    }
    return (
        <TouchableOpacity style={styles.container} onPress={()=>{
            changeSessionHandler(props.id)
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
