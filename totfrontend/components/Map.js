import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import MapView, { addressForCoordinate} from 'react-native-maps';
import { Marker } from "react-native-maps";
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

      

      //Old non-integrated stuff

      // const [houses, setHouses] = useState([
      //   {
      //     latitude: 37.78903606591865,
      //     longitude: -122.43040118689831,
      //     hascandy: true,
      //     openbowl: true,
      //     haslargecandy: true,
      //     houseaddress: "1990 California St, San Francisco, CA 94109, USA",
      //     candyflags: {
      //       "KitKat" : true,
      //       "Snickers" : true,
      //       "M&Ms" : false,
      //     }
      //   },
      // ]);

      const [houses, setHouses] = useState([]);
      // const [apiCandy, setApiCandy] = useState([])

      const [pinLocation, setPinLocation] = useState({
        latitude: 37.5406537,
         longitude: -121.9763485,
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
      const [isLoading, setLoading] = useState(true);

      //TODO
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
    const makeDictFromArray = (arr) => {
      var candyMap = new Map();
      for (var i; i < arr.length; i++){
        candyMap[arr[i].candyid] = {
          candyname: arr[i].candyname,
          chocolate: arr[i].chocolate,
          fruit: arr[i].fruit,
          caramel: arr[i].caramel,
          nut: arr[i].nut,
          nougat: arr[i].nougat,
          hard: arr[i].hard,
          bar: arr[i].bar,
          plural: arr[i].plural
        }
      }
      console.log(candyMap);
      return candyMap;
    }

//     const getApiCandy = () => {
//   return fetch("https://trackortreat-backend.herokuapp.com/api/candy")
//     .then((response) => response.json())
//     .then((json) => {
//       // var arr = makeDictFromArray(json);
//       // setApiCandy(arr);
//       setApiCandy(json);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
      // useEffect(() => {
      //   getApiCandy();
      //   console.log(apiCandy);
      // }, [apiCandy]

      // )
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
      

  return (
    <View style={styles.container}>
      <Header apiCandy={apiCandy} filterOn={filterOn} setFilterOn={setFilterOn} groupValues={filters} setGroupValues={setFilters} candyTypes={candyTypes} showSettings={showSettings} setShowSettings={setShowSettings}/>
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
    />
    )
    }


    </MapView>
    
  </View>
  {houseDetails &&
  <InfoModal getCandyFromId={getCandyFromId} houseDetails={houseDetails} showModal={showDetails} onClose={() => setShowDetails(false)} houseDetails={houseDetails}/>
  }
    {filterOn && <Box borderRadius={4} bg="primary.500" left={4} top={120} position="absolute" p="4" shadow={2}>
      
      <Text mb={1}color="white" fontWeight={"bold"}>Candy filters:</Text>
      <Container centerContent={true}>
      <HStack flex={1} flexWrap="wrap" maxWidth={"100%"} pb={7}>
      {filters.map((value, index) =>
        value && <Badge my={1} mr={1} colorScheme="coolGray">{apiCandy[index].candyname}</Badge>
      
      

      )}
      </HStack>
      </Container>
      
    </Box>}
    <Box position="absolute" bottom={40} >

      {!dropping ? <Button onPress={() => (setDropping(!dropping))}>Click to drop pin</Button>
      :
      <InputModal apiCandy={apiCandy} getIdFromCandy={getIdFromCandy} pinLocation={pinLocation} candyTypes={candyTypes} updateHouses={updateHouses}/>
      }
      
    </Box>


    </View>
        


    
  )
}

export default Map