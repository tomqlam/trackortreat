import React from 'react'
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { Checkbox, Heading, NativeBaseProvider, Text, Box, Button, Center, Input, Modal } from "native-base";
import * as Location from 'expo-location';
import InputModal from './InputModal'

const Preferences = ({showSettings, setShowSettings, candyTypes}) => {
  const [groupValues, setGroupValues] = useState(candyTypes.map((candy) => false));
  const checkedItem =(index) => {
      let dummy = groupValues;
      dummy[index] = !dummy[index]
      setGroupValues(dummy);
      console.log(dummy);

  }
  return (
    
      <Center height="100%" justifyContent="center" alignItems="center">
        <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} size="lg" p={0}>
          <Modal.CloseButton></Modal.CloseButton>
          <Modal.Content>
      <Modal.Header>Tell me what you want</Modal.Header>
            <Modal.Body>
            <Heading size="sm" mb={1}>Preferred candies:</Heading>
            <Box l="0">
              {candyTypes.map((candy, index) => 
                    <Checkbox my={1} key={String(index)} onChange={() => checkedItem(index)}>{candy}</Checkbox>
                )} 
                </Box>
                </Modal.Body>
                <Modal.Footer>
                <Button onPress={() => setShowSettings(false)}>I'm done</Button>
                </Modal.Footer>
                
                </Modal.Content>
        </Modal>
      </Center>
     
      
    
  )
}

export default Preferences