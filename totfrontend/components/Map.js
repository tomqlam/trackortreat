import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import MapView, { addressForCoordinate} from 'react-native-maps';
import { Marker, Polyline } from "react-native-maps";
import { Container, HStack, Badge, NativeBaseProvider, Text, Box, Button, Center, Input } from "native-base";
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

const Map = ({apiCandy, candyTypes, apiHouses, setApiHouses}) => {
    const [filters, setFilters] = useState(new Array(15).fill(false));
    const [filterOn, setFilterOn] = useState(false);
    const [dropping, setDropping] = useState(false);
    const [position, setPosition] = useState({
      latitude: 37.549839,
      longitude: -121.9546433,
         latitudeDelta: 0.005,
         longitudeDelta: 0.0021,
      });
      const [pathCoords, setPathCoords] = useState(null);


      const [houses, setHouses] = useState([]);

      const [pinLocation, setPinLocation] = useState({
        latitude: 37.5406537,
         longitude: -121.9763485,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
      });

      //state for house detail modal
      const [showDetails, setShowDetails] = useState(false);
      const [houseDetails, setHouseDetails] = useState(null);

      const [location, setLocation] = useState(null);
      const [errorMsg, setErrorMsg] = useState(null);

      //state for settings modal
      const [showSettings, setShowSettings] = useState(false);
      const [isLoading, setLoading] = useState(true);
      const [postPathParams, setPostPathParams] = useState(null);


      //hardcoded TODO


    const postPath = (params) => {
      console.log("Path request");
      fetch('https://trackortreat-backend.herokuapp.com/api/house/optimal', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then((response) => response.json())
    .then((responseData) => {
        console.log("responseData : " +responseData); // fetch response data
        var pathCoords = getCoords(responseData);
        setPathCoords(pathCoords);
        // for (var i = 0; i < responseData.length; i++){
        //   console.log(responseData[i].longitude);
        // }
    }).catch((error) => {
        console.log("error : " +error); // error
    });
    }
    
    // useEffect(() => {
    //   postPath();
    // }, []

    // )

    const createPath = (radius) => {
      if (!location || !apiCandy){
        return {};
      }
      var params = {
        userlatitude: 37.5460203,
        userlongitude: -121.9508439,
        radius: radius,
        candyprefs: {

        }
      }
      params = {
        "userlatitude": 37.54907878731697,
        "userlongitude": -121.95357963958861,
        "radius": 0.25,
        "candyprefs": {
          "805460660796686337": true,
          "805460660818509825": true,
          "805460660873756673": false,
          "805460660941651969": true,
          "805460660993327105": true,
          "805460661000962049": true,
          "805460661032288257": true,
          "805460661101101057": true,
          "805460661108637697": true,
          "805460661191999489": false,
          "805460661250949121": true,
          "805460661267267585": true,
          "805460661290696705": true,
          "805460661369208833": true,
          "805460661380513793": true
        }
      }

      for (var i = 0; i < filters.length; i++){
        params.candyprefs[apiCandy[i].candyid] = filters[i];
      }
      
      console.log(params);
      postPath(params);
      return params;
      //filter is an array of trues and falses
      //need to convert to a dictionary 
      //creating path and setting path data
      //postPathParams
    }
    // console.log(createPath(0.25));

      const getApiData = async () => {
  
        try {
         const response = await fetch("https://trackortreat-backend.herokuapp.com/api/house");
         const json = await response.json();
         setHouses(json);
   
         
       } catch (error) {
         console.error(error);
       } finally {
        setLoading(false);
        //  getApiCandy();
   
       }
     }

     useEffect(() => {
      getApiData();
    }, [houses])

    const getIdFromCandy = (candy) => {
      for (var i = 0; i < apiCandy.length; i++){
        if (String(apiCandy[i].candyname) == String(candy)){
          return apiCandy[i];
        }

      }
      return null;
    }
    const getCandyFromId = (id) => {
      console.log("starting rn");
      for (var i = 0; i < apiCandy.length; i++){
        if (String(apiCandy[i].candyid) == String(id)){
          return apiCandy[i];
        }

      }
      console.log("this failed");
      return null;
    }

      useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, [location]);

    
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
        //TODO
        let oldData2 = apiHouses;
        oldData.push(houseData);
        setApiHouses(oldData);
        console.log("updated data");
      }

      useEffect(() => {
        if (apiHouses.length > 1){
          setHouses(apiHouses);
        }
        console.log("uploaded api houses");
        
      }, [])

      const getCoords = (response) => {
        var coordArr = []
        for (var i = 0; i < response.length; i++){
          coordArr.push({
            latitude:response[i].latitude,
            longitude: response[i].longitude,
          })
        }
        console.log(coordArr);
        return coordArr;
      }
      

  return (
    <View style={styles.container}>
      <Header getIdFromCandy={getIdFromCandy} apiCandy={apiCandy} filterOn={filterOn} setFilterOn={setFilterOn} groupValues={filters} setGroupValues={setFilters} candyTypes={candyTypes} showSettings={showSettings} setShowSettings={setShowSettings}/>
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
      {pinLocation && dropping &&
      <CustomMarker
      // key={1}
      
      latitude={pinLocation.latitude}
      longitude={pinLocation.longitude}

      
      />
      
      }

    {!isLoading &&
    houses.map((house, index) =>
 <CustomMarker 
    key={String(index)}
    latitude={house.latitude}
    longitude={house.longitude}
    onPress={() => {
      onPressMarker(house);
    }}
    houseDetails={house}
    filterOn={filterOn}
    filters={filters}
    apiCandy={apiCandy}
    getIdFromCandy={getIdFromCandy}
    />
    )
    }

    {pathCoords && <Polyline
		coordinates={pathCoords}
		strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
		strokeColors={[
			'#7F0000',
			'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/>}


    </MapView>
    
  </View>
  {houseDetails &&
  <InfoModal getCandyFromId={getCandyFromId} houseDetails={houseDetails} showModal={showDetails} onClose={() => setShowDetails(false)} houseDetails={houseDetails}/>
  }
    {filterOn && <Box borderRadius={4} bg="primary.500" left={4} right={4} flex={1} top={120} position="absolute" p="4" shadow={2}>
      
      <Text mb={1}color="white" fontWeight={"bold"}>Candy filters:</Text>
      <Container centerContent={true} >
      <HStack flex={1} flexWrap="wrap">
      {filters.map((value, index) =>
        value && <Badge my={1} mr={1} key={index} colorScheme="coolGray">{apiCandy[index].candyname}</Badge>
      
      

      )}
      </HStack>
      </Container>
      
    </Box>}
    <Box position="absolute" bottom={40} >
      
      {!dropping ? <Button borderWidth={4} borderColor="white" onPress={() => (setDropping(!dropping))} shadow={2}>ADD NEW HOUSE</Button>
      :
      <InputModal dropping={dropping} setDropping={setDropping} apiCandy={apiCandy} getIdFromCandy={getIdFromCandy} pinLocation={pinLocation} candyTypes={candyTypes} updateHouses={updateHouses}/>
      }

<Button borderWidth={4} borderColor="white" mt={3} onPress={() => createPath(1)}>Generate Path</Button>
      
    </Box>


    </View>
        


    
  )
}

export default Map