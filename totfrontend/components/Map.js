import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import MapView, { addressForCoordinate} from 'react-native-maps';
import { Marker } from "react-native-maps";
import { HStack, Badge, NativeBaseProvider, Text, Box, Button, Center, Input } from "native-base";
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
        height: "100%",
        width: "100%",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

const Map = ({candyTypes}) => {
    const [filters, setFilters] = useState(candyTypes.map((candy) => false));
    const [filterOn, setFilterOn] = useState(false);
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
          haslargecandy: true,
          houseaddress: "1990 California St, San Francisco, CA 94109, USA",
          candyflags: {
            "KitKat" : true,
            "Snickers" : true,
            "M&Ms" : false,
          }
        },
      ]);
      const [pinLocation, setPinLocation] = useState({
        latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
      });

      //state for house detail modal
      const [showDetails, setShowDetails] = useState(false);
      const [houseDetails, setHouseDetails] = useState(null);
      const [icon, setIcon] = useState("candy");

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

      
      const onPressMap = (e) => {
        setPinLocation(e.nativeEvent.coordinate)

      }

      const onPressMarker = (house) => {

        setShowDetails(!showDetails);
        setHouseDetails(house);

      }
      const updateHouses = (houseData) => {
        let oldData = houses;
        oldData.push(houseData);
        setHouses(oldData);
      }
  return (
    <View style={styles.container}>
      <Header filterOn={filterOn} setFilterOn={setFilterOn} groupValues={filters} setGroupValues={setFilters} candyTypes={candyTypes} showSettings={showSettings} setShowSettings={setShowSettings}/>
        <View style={styles.mapContainer}>
    <MapView
      style={styles.map}
      region={position}
      onPress={onPressMap}
      userInterfaceStyle={"dark"}
      loadingEnabled={true}
      loadingBackgroundColor={"black"}
      tintColor="orange"
      showsMyLocationButton
      onRegionChange={(e) => setPosition(e.nativeEvent)}
    >
      {pinLocation &&
      <CustomMarker
      // key={1}
      latitude={pinLocation.latitude}
      longitude={pinLocation.longitude}

      
      />
      
      }
    

    {houses.map((house, index) =>
    <CustomMarker 
    key={String(index)}
    latitude={house.latitude}
    longitude={house.longitude}
    onPress={() => {
      onPressMarker(house);
    }}
    houseDetails={house}
    />
    )}


    </MapView>
  </View>
  {houseDetails &&
  <InfoModal houseDetails={houseDetails} showModal={showDetails} onClose={() => setShowDetails(false)} houseDetails={houseDetails}/>
  }
    {filterOn && <Box borderRadius={4} bg="primary.500" left={4} top={120} position="absolute" p="4" shadow={2}>
      <Text mb={1}color="white" fontWeight={"bold"}>Candy filters:</Text>
      <HStack >
      {filters.map((value, index) =>
        value && <Badge mr={1} colorScheme="coolGray">{candyTypes[index]}</Badge>
      
      

      )}
      </HStack>
      
    </Box>}
    <Box position="absolute" bottom={40} >
    <InputModal pinLocation={pinLocation} candyTypes={candyTypes} updateHouses={updateHouses}/>
    </Box>
    
    </View>
        


    
  )
}

export default Map