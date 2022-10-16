import React from "react";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { ScrollView, Radio, Heading, Modal, FormControl, Input, Checkbox, NativeBaseProvider, Text, Box, Button, Center } from "native-base";

const InputModal = ({dropping, setDropping, apiCandy, getIdFromCandy, candyTypes, pinLocation, updateHouses}) => {
    const [showModal, setShowModal] = useState(false);
    const [bowl, setBowl] = React.useState("door");
    const [groupValues, setGroupValues] = useState(apiCandy.map((candy) => false));
    const [bigCandy, setBigCandy] = useState(false);

    const [isLoading, setLoading] = useState(true);
    const [address, setAddress] = useState([]);




    const postReq = (body) => {
      console.log("posting");
      console.log(body);
      fetch('https://trackortreat-backend.herokuapp.com/api/house', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});
    }
  
    const getAddress = async (latitude, longitude) => {
      url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + String(latitude) + ","+ String(longitude) + "&key=AIzaSyDOImd6yMNGtTUInoFCGfbBlXB4cVs0kos"
       try {
        const response = await fetch(url);
        const json = await response.json();
        setAddress(json.results[1].formatted_address);
        return address;
      } catch (error) {
        console.error(error);
        throw(error);
      } finally {
        setLoading(false);
        console.log(address);
        return address;
      }
    }
  

    const resetFields = () => {
      setBowl("door");
      setGroupValues([false, false, false]);
      setBigCandy(false);
      console.log("rest");

    }
    const checkedItem =(index) => {
        let dummy = groupValues;
        dummy[index] = !dummy[index]
        setGroupValues(dummy);

    }

    const prepareHouseData = () => {
      var data = {
        latitude: pinLocation.latitude,
        longitude: pinLocation.longitude,
        candyflags: {},
        openbowl: bowl == "bowl",
        hascandy: true,
        haslargecandy: bigCandy,
        houseaddress: address,


      }
      for (var i = 0; i < groupValues.length; i++){
        console.log(apiCandy[i].candyid);
        data.candyflags[apiCandy[i].candyid] = groupValues[i];
      }
      if (bowl == "none"){
        data.hascandy = false;
      }
      console.log(data);
      return data;

      
    }
    return <Center>
        <Button mt={3}
        size="lg"
        onPress={() => {
          resetFields();
          setShowModal(true);
          getAddress(pinLocation.latitude, pinLocation.longitude);
        }
        }>Tap anywhere to drop pin, and here to submit</Button>
        <Modal isOpen={showModal} onClose={() => {
          setShowModal(false)
        }}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>About this house</Modal.Header>
            <Modal.Body>
            <Text mb={1}>Distribution type</Text>
            <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={bowl} onChange={nextValue => {
    setBowl(nextValue);
  }}><Radio value="none" my={1}>
  No candy
</Radio>
      <Radio value="bowl" my={1}>
        Bowl outside
      </Radio>
      <Radio value="door" my={1}>
        Knock on door
      </Radio>
      <Text my={1}>BIG candy?</Text>
              <Checkbox isDisabled={bowl=="none"} value="test" accessibilityLabel="This is a dummy checkbox" onPress={() => setBigCandy(!bigCandy)}>Yes!</Checkbox>
    </Radio.Group>
    
            
            <Text my={1}>Candy offered here</Text>
            
            <ScrollView>
              {apiCandy && apiCandy.map((candy, index) => 
                    <Checkbox isDisabled={bowl=="none"} my={1} key={String(index)} onPress={() => checkedItem(index)}>{candy.candyname}</Checkbox>
                )} 
                </ScrollView>
              
              
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false);
              }}>
                  Cancel
                </Button>
                <Button onPress={() => {
                postReq(prepareHouseData());
                setDropping(false);
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