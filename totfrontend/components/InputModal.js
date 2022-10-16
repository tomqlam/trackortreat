import React from "react";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Radio, Heading, Modal, FormControl, Input, Checkbox, NativeBaseProvider, Text, Box, Button, Center } from "native-base";

const InputModal = ({candyTypes, pinLocation, updateHouses}) => {
    const [showModal, setShowModal] = useState(false);
    const [bowl, setBowl] = React.useState("door");
    const [groupValues, setGroupValues] = useState(candyTypes.map((candy) => false));
    const checkedItem =(index) => {
        let dummy = groupValues;
        dummy[index] = !dummy[index]
        setGroupValues(dummy);
        console.log(dummy);

    }

    const prepareHouseData = () => {
      var data = {
        latitude: pinLocation.latitude,
        longitude: pinLocation.longitude,
        candyflags: {},
        openbowl: bowl == "bowl",
        hascandy: !(bowl == "none"),



      }
      for (var i = 0; i < groupValues.length; i++){
        data.candyflags[candyTypes[i]] = groupValues[i];
      }
      return data;

      
    }
    return <Center>
        <Button mt={3}onPress={() => setShowModal(true)}>Drop pin here!</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>About this house</Modal.Header>
            <Modal.Body>
            <Text mb={1}>Distribution type</Text>
            <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={bowl} onChange={nextValue => {
    setBowl(nextValue);
  }}><Radio value="None" my={1}>
  No candy
</Radio>
      <Radio value="bowl" my={1}>
        Bowl outside
      </Radio>
      <Radio value="door" my={1}>
        Knock on door
      </Radio>
    </Radio.Group>
            
            <Text my={1}>Candy offered here</Text>
              {candyTypes.map((candy, index) => 
                    <Checkbox isDisabled={bowl=="None"} my={1} key={String(index)} onPress={() => checkedItem(index)}>{candy}</Checkbox>
                )} 
              
    
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false);
              }}>
                  Cancel
                </Button>
                <Button onPress={() => {
  
                console.log(groupValues);
                updateHouses(prepareHouseData());
                setShowModal(false);
              }}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>;
  };
  export default InputModal;