
import { StyleSheet, View } from 'react-native';
import React from "react";

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
  return (
    <NativeBaseProvider theme={theme}>
      
      <Map candyTypes={candyTypes} />
      
      {/* <Preferences candyTypes={candyTypes} /> */}
    </NativeBaseProvider>
  );
}

