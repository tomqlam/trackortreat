import React from "react";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Radio, Heading, Modal, FormControl, Input, Checkbox, NativeBaseProvider, Text, Box, Button, Center } from "native-base";


const InfoModal = ({houseDetails, showModal, onClose}) => {
    const [candies, setCandies] = useState(["Test"]);
    const createCandyList = (candyflags) => {
        let candies = []
        Object.keys(candyflags).forEach(function(key, index) {

            if (candyflags[key]){
                candies.push(key);
            }
            
          });
        setCandies(candies);
    }
    useEffect(() =>
    {
        createCandyList(houseDetails.candyflags);
    }, [houseDetails]

    );
  return (
    <Center>
      <Modal isOpen={showModal} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Whatchu got?</Modal.Header>
          <Modal.Body>
            <Text>Address: {houseDetails.houseaddress}</Text>
          {!houseDetails.hascandy ? 
            <Text>There's no candy!</Text>
        :
        <>
        <Text>Candy: </Text>
            {
                candies.map((candy, index) => <Text key={index}>{candy}</Text>)
                

            }
            
            {houseDetails.openbowl && 
            <Text>There's an open bowl!</Text>}
            {houseDetails.haslargecandy &&
            <Text>There's BIG candy!</Text>}
        </>
        
        }
            
            
          </Modal.Body>
          <Modal.Footer>

              <Button onPress={onClose}>
                Take me back
              </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
    
  )
}

export default InfoModal