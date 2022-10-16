
import { StyleSheet, View } from 'react-native';
import React, {useEffect, useState} from "react";

import { NativeBaseProvider, Text, Box, extendTheme, Button} from "native-base";
import Map from './components/Map';
import Preferences from './components/Preferences';
import Ionicons from '@expo/vector-icons/Ionicons';

const candyTypes = [
  "Kitkat",
  "Crunch",
  "Snickers"
]

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [apiHouses, setApiHouses] = useState([]); 
  const [apiCandy, setApiCandy] = useState(null)
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        "50": "#ffca7f",
        "100": "#ffbe63",
        "200": "#ffb247",
        "300": "#ffa72b",
        "400": "#ff9b0f",
        "500": "#f89305",
        "600": "#e3890a",
        "700": "#cf7f0e",
        "800": "#bb7411",
        "900": "#a86a14"
      },

      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },

  
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });
const getApiCandy = () => {
  return fetch("https://trackortreat-backend.herokuapp.com/api/candy")
    .then((response) => response.json())
    .then((json) => {
      setApiCandy(json);
    })
    .catch((error) => {
      console.error(error);
    });
};

  const getApiData = async () => {
  
     try {
      const response = await fetch("https://trackortreat-backend.herokuapp.com/api/house");
      const json = await response.json();
      setApiHouses(json);

      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log(apiHouses.length);

    }
  }

  useEffect(() => {
    getApiData();
  }, [apiHouses])
  useEffect(() => {
    getApiCandy();
  }, [])

  return (
    <NativeBaseProvider theme={theme}>
      
      <Map setApiHouses={setApiHouses} apiCandy={apiCandy} apiHouses={apiHouses} candyTypes={candyTypes} />
      
      {/* <Preferences candyTypes={candyTypes} /> */}
    </NativeBaseProvider>
  );
}

