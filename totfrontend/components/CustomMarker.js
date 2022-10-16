import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { NativeBaseProvider, Text, Box, Button, Center, Input } from "native-base";
import * as Location from 'expo-location';

const CustomMarker = ({ houseDetails, onPress, latitude, longitude}) => {

    const decideIcon = (houseDetails) => {
        if (!houseDetails){
            return "down"
        }
        if (houseDetails.haslargecandy){
          return "bigcandy";
        } else if (houseDetails.openbowl){
          return "bowl";
        } else if (houseDetails.hascandy){
          return "candy";
        } 
        return "none";

      }
      var icon = decideIcon(houseDetails);

    const getURL = () => {
        if (icon == "down"){
            return require('../assets/down.png');
        } else if (icon == "bigcandy"){
            return require("../assets/bigcandy.png")
        }else if (icon == "candy"){
            return require('../assets/lollipop.png');
        } else if (icon == "none"){
            return require('../assets/no-sugar.png');
        } else {
            return require("../assets/bowl.png");
        }
    }
    var url = getURL();
  return (
        <Marker
      coordinate={{ latitude : latitude , longitude : longitude }}
      onPress={onPress}
    >
      <Image source={url} style={{height: 35, width:35 }} />
     
      
    </Marker>
  )
}

export default CustomMarker