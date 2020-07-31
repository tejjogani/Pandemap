import React from "react";
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Image } from "react-native";
import CrowdingIndicator from '../explore/CrowdingIndicator';


export default Saved = () => {
  const summaryData = require('../../assets/sampleData/summary.json');
  const saved = [summaryData[1], summaryData[2], summaryData[5]]
  return (
    <View style={{ marginTop: 50 }}>
      <Text style={{fontSize: 32, fontWeight: 'bold', paddingLeft: 20, color: '#2962FF'}}>Saved</Text>
      <SectionList
        sections={saved}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <LocationsListItem
          location={item}
        />}
        renderSectionHeader={({ section: { category } }) => <LocationsListHeader category={category} />}
      />
    </View>
  )
}

const LocationsListItem = ({ location }) => (
  <View style={styles.listItemContainer}>
    <Image
      style={{ width: 60, backgroundColor: 'powderblue', margin: 10, borderRadius: 5 }}
      source={{
        uri: location.img_url,
      }} />
    <View style={styles.locationsListItem}>
      <View style={styles.locationInfo}>
        <Text style={{ color: '#333', fontSize: 14 }}>{location.name}</Text>
        <Text style={{ color: '#777', fontSize: 12 }}>{' · ' + location.distance + 'm'}</Text>
        <Text style={{ color: '#777', fontSize: 12 }}>{' · ' + (location.crowding * 100) + '% Full'}</Text>
      </View>

      <CrowdingIndicator crowdingLevel={location.crowding} />
    </View>
  </View>
);

const LocationsListHeader = ({ category }) => (
  <View style={styles.listHeaderContainer}>
    <Text style={styles.locationsListHeader}>{category}</Text>
  </View>
);

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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444'
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