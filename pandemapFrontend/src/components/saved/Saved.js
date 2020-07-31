import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SectionList
} from "react-native";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default Saved = () => {
  const summaryData = require('../../assets/sampleData/summary.json');
  const locations = summaryData[0].data;
  const LocationsListHeader = summaryData[0].category;
  /*
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <SectionList
             bounces={true}
             sections={[locations]}
             keyExtractor={(item, index) => item + index}
             renderItem={({ item }) => <LocationsListItem 
                                           location={item}
                                           leastCrowded={findLeastCrowdedPlace(locations.data)}
                                           showDetails={showDetails}
                                           toggleModal={toggleModal}
                                         />}
             renderSectionHeader={({ section: { category } }) => <LocationsListHeader category={category} />}
             style={{marginBottom: 40}}
          />
     </View>
  );
  */
 return <Text>hello</Text>
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

/*
import 'react-native-gesture-handler';
import React, { Component } from "react";
import { View, Text} from "react-native";

export default News = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{color: '#777'}}>depressing covid news</Text>
        </View>
    );
}
*/