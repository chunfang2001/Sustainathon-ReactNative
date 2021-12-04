import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Header from '../UI/Header';

export default function MapViewing() {
    const loc = useSelector(state=>state.location)
    return (
        <View>
            <Header>Map</Header>
            <Divider width={3}></Divider>
            <MapView
            style={styles.mapStyle}
            initialRegion={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            }}
            >
                <Marker coordinate = {{latitude: loc.latitude,longitude: loc.longitude}}
                pinColor = {"red"} // any color
                title={"Your location"}/>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapStyle:{
        alignItems:'center',
        flexDirection:'column',
        height:"100%"
    }
})