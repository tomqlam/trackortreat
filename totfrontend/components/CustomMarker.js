import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { NativeBaseProvider, Text, Box, Button, Center, Input } from "native-base";
import * as Location from 'expo-location';

const CustomMarker = ({ apiCandy, getIdFromCandy, houseDetails, onPress, latitude, longitude, filterOn, filters}) => {
  const [show, setShow] = useState(true);

  const shouldShow = () => {
      if (!apiCandy){
        //probably another marker
        console.log("Null candy api");
        return true;
      }
        if (filterOn){
            //check if this has the right candies
            for (var i = 0; i < filters.length; i++){
              if (filters[i] && houseDetails.candyflags[apiCandy[i].candyid]){
                console.log("Found a match");
                return true;
              }
            }
            return false;

        } 
        //else filter off
        return true;
    }

    useEffect(() => {
      setShow(shouldShow);
    }, [filterOn, filters, apiCandy]
  
    )  

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
    <>
    {show && <Marker

coordinate={{ latitude : latitude , longitude : longitude }}
onPress={onPress}
>
<Image source={url} style={{height: 35, width:35 }} />


</Marker>}
    </>
    
  
        
  )
}

export default CustomMarker