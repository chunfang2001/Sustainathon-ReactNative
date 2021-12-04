import React from 'react'
import { Text, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { sessionSliceAction } from '../../store/sessionSlice'
import { useSelector } from 'react-redux'

export default function SessionChoice(props) {
    const session_id = useSelector(state => state.session.id)
    const takingAtt = useSelector(state=> state.session.takingAtt)
    const dispatch = useDispatch()
    const changeSessionHandler=(id)=>{
        if(session_id !== props.id){
            if(takingAtt){
                Alert.alert(
                    "Attendance Warning",
                    "Are you sure you want to leave the attendance session? You will lose your attendance if you click 'OK' button",
                    [
                      {
                        text: "Cancel",
                        onPress: () => {
                            return
                        },
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => {
                        dispatch(sessionSliceAction.changeSession({
                            id:id,
                            startedAt:props.startedAt
                        }))
                        props.nav.navigate('Class',{
                            change: true,
                        })
                      } }
                    ]
                  );
            }else{
                dispatch(sessionSliceAction.changeSession({
                    id:id,
                    startedAt:props.startedAt
                }))
                props.nav.navigate('Class',{
                    change: true,
                })
            }
            
        }else{
            props.nav.navigate('Class',{
                change: false,
            })
        }
    }
    return (
        <TouchableOpacity style={styles.container} onPress={()=>{
            changeSessionHandler(props.id)
            
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
        alignItems:'center',
        elevation:5
    },
    title:{
        fontSize:20,
    }
})
