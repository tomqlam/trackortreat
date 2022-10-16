import React from 'react'
import { TouchableWithoutFeedback,SafeAreaView, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { IconButton, Pressable, Checkbox, Heading, NativeBaseProvider, Text, Box, Button, Center, Input } from "native-base";
import * as Location from 'expo-location';
import InputModal from './InputModal'
import Ionicons from '@expo/vector-icons/Ionicons';
import Preferences from './Preferences';

const Header = ({filterOn, setFilterOn, setGroupValues, groupValues, showSettings, setShowSettings, candyTypes}) => {
  return (
    <View top={0} position="absolute" zIndex={5} width="100%" height="12%" backgroundColor="#f89305">
        <Button variant="unstyled" zIndex={40}  position="absolute" bottom={2} marginLeft={5} onPress={()=>{
            setShowSettings(true);
            }} startIcon={<Ionicons name='settings-outline' color="white" size={32}/>}></Button>
        <Center pb={5} h="100%" justifyContent="center" alignItems={"flex-end"} flexDirection="row">

            <Heading color="white">track o' treat</Heading>
            <Preferences filterOn={filterOn} setFilterOn={setFilterOn} setGroupValues={setGroupValues} groupValues={groupValues} showSettings={showSettings} setShowSettings={setShowSettings} candyTypes={candyTypes}/>
        
        </Center>

    </View>
  )
}

export default Header