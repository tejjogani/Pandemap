import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default SuggestionModal = ({visible = false, toggleModal, showDetails, current = null, suggested = null}) => {
  //const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={[styles.centeredView]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
            
        }}
      >
        <View style={[styles.centeredView, styles.modalWrapper, {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>
          <View style={styles.modalView}>
                {
                    current ? 
                    <Text style={styles.modalText}>
                        <Text>You picked </Text>
                        <Text style={{fontWeight: 'bold', color: "#111"}}>{current.name}</Text>
                        <Text> but </Text>
                        <Text style={{fontWeight: 'bold', color: "#111"}}>{suggested.name}</Text>
                        <Text> is </Text>
                        <Text style={{fontWeight: 'bold', color: "#28B463"}}>{((current.crowding-suggested.crowding) * 100).toFixed(1) + '%'}</Text>
                        <Text> less crowded.</Text>
                    </Text>
                    : <></>
                }
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2962FF" }}
              onPress={() => {
                const details = require('../../assets/sampleData/details.json')
                showDetails(details);

                toggleModal();
              }}
            >
                <Text style={styles.textStyle}>View {suggested ? suggested.name : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.closeButton, marginTop: 10 }}
              onPress={() => {
                const details = require('../../assets/sampleData/details-doe.json')
                showDetails(details);

                toggleModal();
              }}
            >
              <Text style={{...styles.textStyle.color, color: '#2962FF'}}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    position: "absolute",
    height: windowHeight,
    width: windowWidth
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
  },
  modalView: {
    width: 300,
    margin: 20,
    //marginBottom: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
    padding: 15,
    elevation: 2,
    marginTop: 10
  },
  closeButton: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#fff'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
    lineHeight: 25,
  }
});
