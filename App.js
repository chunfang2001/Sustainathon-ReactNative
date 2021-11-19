import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Page from './Page';
import { Platform } from 'expo-modules-core';
import { StyleSheet, View, StatusBar, Text, BackHandler, Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import * as Location from "expo-location";

export default function App() {
  
  return (
    <Provider store={store}>
      <View style={styles.container}>
        
        <Page/>
        {/* <MapView style={styles.map} /> */}
      </View>
    </Provider>
    
  );
  
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:Platform.OS==='android'? StatusBar.currentHeight:0,
    flexDirection:'column',
    alignItems:'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


