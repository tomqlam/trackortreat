import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { NativeBaseProvider, Text, Box, Button, Center, Input } from "native-base";
import * as Location from 'expo-location';

const CustomMarker = ({ onPress, key, latitude, longitude, icon}) => {
  return (
        <Marker
      key={key}
      coordinate={{ latitude : latitude , longitude : longitude }}
      onPress={onPress}
    >
      { icon=="down" && <Image source={require('../assets/down.png')} style={{height: 35, width:35 }} />}
      { icon=="candy" && <Image source={require('../assets/lollipop.png')} style={{height: 35, width:35 }} />}
      { icon=="none" && <Image source={require('../assets/no-sugar.png')} style={{height: 35, width:35 }} />}
    </Marker>
  )
}

export default CustomMarker