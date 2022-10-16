import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { NativeBaseProvider, Text, Box, Button, Center, Input } from "native-base";
import * as Location from 'expo-location';
import InputModal from './InputModal';
import InfoModal from "./InfoModal";
import Header from "./Header";
import CustomMarker from "./CustomMarker";

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",

    },
    mapContainer : {
        height: "80%",
        width: "100%",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

const Map = ({candyTypes}) => {
    const [position, setPosition] = useState({
        latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
      });
      const [houses, setHouses] = useState([
        {
          latitude: 37.78903606591865,
          longitude: -122.43040118689831,
          hascandy: true,
          openbowl: true,
          candyflags: {
            "KitKat" : true,
            "Snickers" : true,
            "M&Ms" : false,
          }
        },
      ]);
      const [pinLocation, setPinLocation] = useState(position);

      //state for house detail modal
      const [showDetails, setShowDetails] = useState(false);
      const [houseDetails, setHouseDetails] = useState(null);

      const [location, setLocation] = useState(null);
      const [errorMsg, setErrorMsg] = useState(null);

      //state for settings modal
      const [showSettings, setShowSettings] = useState(false);
      
      useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          // setPosition({
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
          //   latitudeDelta: 0.011,
          //   longitudeDelta: 0.0111,
          // })
        })();
      }, [location]);
      

    
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }
//end new

      const updateHouses = (houseData) => {
        let oldData = houses;
        oldData.push(houseData);
        setHouses(oldData);
        console.log(houses);
      }
      const onPressMap = (e) => {
        setPinLocation(e.nativeEvent.coordinate)

      }

      const onPressMarker = (house) => {

        setShowDetails(!showDetails);
        setHouseDetails(house);
        console.log(houseDetails);

      }
  return (
    <View style={styles.container}>
      <Header candyTypes={candyTypes} showSettings={showSettings} setShowSettings={setShowSettings}/>
        <View style={styles.mapContainer}>
    <MapView
      style={styles.map}
      region={position}
      onPress={onPressMap}
      liteMode={true}
    >
      {pinLocation &&
      <CustomMarker
      key={1}
      latitude={pinLocation.latitude}
      longitude={pinLocation.longitude}
      icon={"down"}
      />
      
      }
    

    {houses.map((house, index) =>
    <CustomMarker 
    key={String(index)}
    latitude={house.latitude}
    longitude={house.longitude}
    onPress={() => onPressMarker(house)}
    icon="candy"
    />
    )}


    </MapView>
  </View>
  {houseDetails &&
  <InfoModal houseDetails={houseDetails} showModal={showDetails} onClose={() => setShowDetails(false)} houseDetails={houseDetails}/>
  }
  
    <InputModal pinLocation={pinLocation} candyTypes={candyTypes} updateHouses={updateHouses}/>
    </View>
        


    
  )
}

export default Map