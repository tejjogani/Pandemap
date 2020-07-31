import React from "react";
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Image } from "react-native";
import CrowdingIndicator from './CrowdingIndicator';

const findLeastCrowdedPlace = (locations) => {
  var leastCrowded = locations[0];
  for (const place of locations) {
    if (place.crowding < leastCrowded.crowding) {
      leastCrowded = place;
    }
  }

  return leastCrowded;
}

export default CategoryPage = ({locations, showDetails, toggleModal}) => {
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
)};

const LocationsListItem = ({ location, leastCrowded, showDetails, toggleModal }) => (
    <TouchableOpacity style={styles.listItemContainer} onPress={() => onLocationPress(showDetails, leastCrowded, toggleModal, location)}>
      <Image 
        style={{width: 60, backgroundColor: 'powderblue', margin: 10, borderRadius: 5}} 
        source={{
          uri: location.img_url,
        }}/>
        <View style={styles.locationsListItem}>
          <View style={styles.locationInfo}>
            <Text style={{color: '#333', fontSize: 14}}>{location.name}</Text>
            <Text style={{color: '#777', fontSize: 12}}>{' · ' + location.distance + 'm'}</Text>
            <Text style={{color: '#777', fontSize: 12}}>{' · ' + (location.crowding*100) + '% Full'}</Text>
          </View>
  
          <CrowdingIndicator crowdingLevel={location.crowding} />
      </View>
    </TouchableOpacity>
);

const LocationsListHeader = ({ category }) => (
    <View style={styles.listHeaderContainer}>
        <Text style={styles.locationsListHeader}>{category}</Text>
    </View>
);

const onLocationPress = (showDetails, leastCrowded, toggleModal, location) => {
  //alert(leastCrowded.name);
  if (location != leastCrowded) {
    toggleModal(showDetails, location, leastCrowded);
  } else {
    const details = require('../../assets/sampleData/details.json');
      showDetails(details);
  }
  // get details by calling api on locationId
  // const locationId = location.id
  //const details = require('../../assets/sampleData/details.json')

  //onLocationPressHelper(details);
}

const styles = StyleSheet.create({
    listHeaderContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#D6DBDF',
      },
      locationsListHeader: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      listItemContainer: {
        borderBottomWidth: 1,
        borderColor: '#D6DBDF',
        flex: 1,
        flexDirection: 'row',
        height: 'auto'
      },
      locationsListItem: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
      },
      locationInfo: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10
      }
});