import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";

export default Navigation = (props) => {
    const mapRoute = JSON.parse(JSON.stringify(props.mapRoute));
    return (
        <>
            <MapboxGL.ShapeSource
            id="route"
            shape={
                {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: mapRoute //[[-122.259487, 37.870298], [-122.25956, 37.87055], [-122.2596, 37.87065], [-122.25964, 37.87074], [-122.2597, 37.8709], [-122.2598, 37.8712], [-122.25992, 37.87158], [-122.25995, 37.87179], [-122.26008, 37.87214], [-122.26025, 37.8724], [-122.26053, 37.87224], [-122.26076, 37.872182]]
                    //[[-122.2586, 37.8703], [-122.25856, 37.8701], [-122.25849, 37.86974], [-122.25839, 37.86921], [-122.25832, 37.86883], [-122.25852, 37.86881], [-122.25868, 37.86879], [-122.25921, 37.86873], [-122.25927, 37.86872], [-122.25974, 37.86866], [-122.25996, 37.86863], [-122.26019, 37.8686], [-122.26091, 37.8685], [-122.26146, 37.86842], [-122.2623, 37.86833], [-122.26365, 37.86818], [-122.26375, 37.86817], [-122.26425, 37.86809], [-122.26492, 37.86799], [-122.26521, 37.86795], [-122.26547, 37.86791], [-122.26571, 37.86795], [-122.26581, 37.86801], [-122.26589, 37.86812], [-122.26602, 37.86832], [-122.26608, 37.86846], [-122.26616, 37.86862], [-122.2662, 37.86871], [-122.26621, 37.86877], [-122.26619, 37.86888], [-122.26613, 37.86899], [-122.26607, 37.86908], [-122.26601, 37.86917], [-122.26591, 37.86937], [-122.26584, 37.86949], [-122.26578, 37.86961], [-122.26575, 37.86969], [-122.26574, 37.86977], [-122.26574, 37.86985], [-122.26575, 37.87], [-122.26577, 37.87015], [-122.26578, 37.8702], [-122.26583, 37.8706], [-122.26569, 37.87061], [-122.26552, 37.87065], [-122.26531, 37.87076], [-122.26521, 37.87086], [-122.26511, 37.87099], [-122.26502, 37.87116], [-122.26497, 37.87139], [-122.265, 37.87157], [-122.26501, 37.87168], [-122.26488, 37.87171], [-122.26471, 37.87174], [-122.26459, 37.87177], [-122.26441, 37.87181], [-122.26432, 37.87183], [-122.26372, 37.87197], [-122.26364, 37.87193], [-122.26351, 37.87193], [-122.26341, 37.87198], [-122.26336, 37.87205], [-122.26337, 37.87215], [-122.2634, 37.8722], [-122.26348, 37.87228], [-122.26316, 37.87251], [-122.26298, 37.87265], [-122.26286, 37.8727], [-122.26274, 37.87273], [-122.26256, 37.87277], [-122.26239, 37.8728], [-122.26219, 37.87278], [-122.26211, 37.87278], [-122.2619, 37.87274], [-122.26179, 37.87272], [-122.26156, 37.87267], [-122.2615, 37.87273], [-122.261348, 37.87286]],
                },
                }
            }
            />
            <MapboxGL.LineLayer
            id="routeLine"
            sourceID="route"
            //belowLayerID="park label"
            sourceLayerID="park label"
            style={{
                lineColor: 'dodgerblue',
                lineWidth: 7,
                lineCap: 'round',
                lineJoin: 'round',
                lineOpacity: 0.8,
            }}
            />
            <MapboxGL.MarkerView id={'userDestination'} coordinate={mapRoute[mapRoute.length-1]}/>
            
            {/* <MapboxGL.PointAnnotation coordinate={[-122.262644, 37.868334]}>
              <Image
                style={{height: 35, width: 35, marginBottom: 25}}
                source={require('../../assets/pin-outline.png')}
              />
            </MapboxGL.PointAnnotation> */}
        </>
    )
}
