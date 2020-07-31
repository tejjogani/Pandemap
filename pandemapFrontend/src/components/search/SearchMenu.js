import { Navigation } from "react-native-navigation";
import React, { Component, useRef, useEffect } from "react";
import { Animated, StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, TextInput } from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';

Icon.loadFont();


export default SearchMenu = (props) => {
        return (
            <View style={{position: 'absolute', backgroundColor: '#fff', width: '100%', height: '100%', top: 0, zIndex:11}}>
                <SearchInput parentId={props.componentId}/>
            </View> 
			)
}

class SearchInput extends Component {
	constructor(props) {
        super(props);
        this.closeSearch = () => Navigation.pop(props.parentId);
    }
	
	render () {
		return (
			<View style={[styles.searchInputWrapper, styles.searchBox]}>
				<TouchableOpacity onPress={this.closeSearch} style={styles.closeSearch}>
                    <Icon name="ios-arrow-back" size={25} color="#333" style={{paddingLeft: 15}}/>
                    
				</TouchableOpacity>
				<TextInput 
                    style={styles.searchInput} 
                    autoFocus={true} 
                    placeholder={'Where to?'}
                    placeholderTextColor={'grey'}
			    />
                <Icon name="ios-search" size={22} color="#2962FF" style={{paddingRight: 17, paddingTop: 10}}/>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	searchBox: {
        height: 45,
        width: '90%',
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 10,
        top: 55,
        alignSelf: 'center',
        borderRadius: 7
	},
	searchShadow: {
		shadowColor: '#00000099',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 2,
		shadowOpacity: 5,
		padding: 15,
        paddingLeft: 16,
	},
	searchInputWrapper: {
		borderWidth: 1,
		borderColor: '#CFD8DC',
		flex: 1,
		flexDirection: 'row'
	},
	searchInput: {
		height: '100%',
        paddingTop: 2.7,
		color: '#555',
		fontSize: 15,
		//paddingLeft: 15,
		flex: 1,

		//fontWeight: '500',
	},
	closeSearch: {
		paddingTop: 9,
		width: 55,
	},
	searchPlaceholder: {
		fontSize: 15,
		color: 'grey',
	},
});