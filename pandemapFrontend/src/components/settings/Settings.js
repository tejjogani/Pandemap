import 'react-native-gesture-handler';
import React, { Component } from "react";
import { View, Text} from "react-native";

export default Settings = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{color: '#777'}}>Settings</Text>
        </View>
    );
}