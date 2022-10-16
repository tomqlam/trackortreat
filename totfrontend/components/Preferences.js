import React from 'react'
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { VStack, Switch, Checkbox, Heading, NativeBaseProvider, Text, Box, Button, Center, Input, Modal } from "native-base";
import * as Location from 'expo-location';
import InputModal from './InputModal'

const Preferences = ({apiCandy, filterOn, setFilterOn, setGroupValues, groupValues, showSettings, setShowSettings, candyTypes}) => {
  
  const checkedItem =(index) => {
      let dummy = groupValues;
      dummy[index] = !dummy[index]
      setGroupValues(dummy);

  }
  return (
    
      <Center height="100%" justifyContent="center" alignItems="center">
        <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} size="lg" p={0}>
          <Modal.CloseButton></Modal.CloseButton>
          <Modal.Content>
      <Modal.Header>Tell me what you want</Modal.Header>
            <Modal.Body>
              <VStack space={3}>
            <Heading size="sm">Enable candy filters?</Heading>
              <Switch isChecked={filterOn} onToggle={()=>{console.log(filterOn);
            setFilterOn(!filterOn);
            }}></Switch>
            <Heading size="sm" >Preferred candies:</Heading>
            <Box l="0">
              {apiCandy && apiCandy.map((candy, index) => 
                    <Checkbox isDisabled={!filterOn} key={String(index)} onChange={() => checkedItem(index)}>{candy.candyname}</Checkbox>
                )} 
                </Box>
                </VStack>
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