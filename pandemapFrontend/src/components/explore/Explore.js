import 'react-native-gesture-handler';
import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import SearchBar from './SearchBar';
import LocationsBottomSheet from './LocationsBottomSheet';
import Navigation from './Navigation';
import SuggestionModal from './SuggestionModal';

MapboxGL.setAccessToken("pk.eyJ1IjoicGF0aWxhdGhhcnZhIiwiYSI6ImNrOHN3MG5yczAzNzYzcW53anExZXZhNzkifQ.tZlhVCnq5qVYs3cEQbdSdw");


export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.componentId = props.componentId;
    this.state = {
      routeFlag: false, // whether route is displayed or not
      mapRoute: null,
      modalVisible: false,
      selectedPlace: null,
      suggestedPlace: null,
      showSuggested: false,
    }
  }
  
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  getRouteBounds(route) {
    if (route) {
      var northMost = route[0][0];
      var southMost = route[0][0];

      var westMost = route[0][1];
      var eastMost = route[0][1];

      for (const coordinate of route) {
        const lat = coordinate[0];
        const lon = coordinate[1];

        if (lat > northMost) {
          northMost = lat;
        } else if (lat < southMost) {
          southMost = lat;
        }

        if (lon > eastMost) {
          eastMost = lon;
        } else if (lon < westMost) {
          westMost = lon;
        }
      }
    }

    const bounds = [[northMost, eastMost], [southMost, westMost]];

    return bounds;
  }

  updateRoute(route=this.state.route) {
    var routeFlag = false;
    if (route) {
      routeFlag = true;
    }

    this.setState({routeFlag: routeFlag, mapRoute: route});
    
    if (route) {
      const bounds = this.getRouteBounds(route);

      this.camera.fitBounds(bounds[0], bounds[1], [0, 0, 500, 0], 800);
    }
  }

  toggleModal(showDetails, selectedPlace = null, suggestedPlace = null) {
    //alert('hey');

    this.showDetails = showDetails;
    const showModal = !this.state.modalVisible;
    
    if (showModal) {
      this.setState({selectedPlace: selectedPlace, suggestedPlace: suggestedPlace});
    }
    this.setState({modalVisible: showModal});

  }

  showSuggested() {
    //return 
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          {
            this.state.routeFlag ?
              null
              : <SearchBar parentId={this.componentId}/>
          }
          <MapboxGL.MapView 
            style={styles.map} 
            styleURL={'mapbox://styles/patilatharva/ckbmgk2tt1e0b1ipb5455tyou'}
          >
            <MapboxGL.Camera 
              ref={camera => this.camera = camera}
              defaultSettings={{
                centerCoordinate: [-122.260268, 37.868698],
                zoomLevel: 15
              }}
              //followUserLocation={true}
              //followUserMode={'normal'}
            />
            {
              this.state.routeFlag ?
                <Navigation mapRoute={this.state.mapRoute}/>
                : null
            }
            <MapboxGL.UserLocation />
          </MapboxGL.MapView>
          <LocationsBottomSheet 
            updateRoute={this.updateRoute.bind(this)}
            toggleModal={this.toggleModal.bind(this)}
          />

          <SuggestionModal 
            visible={this.state.modalVisible} 
            toggleModal={this.toggleModal.bind(this)}
            showDetails={this.showDetails}
            current={this.state.selectedPlace} 
            suggested={this.state.suggestedPlace}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    height: '100%',
    width: '100%',
  }
})