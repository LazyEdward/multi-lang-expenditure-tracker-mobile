import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const DayListItem = ({item, setItemName, setItemPrice, onRemove, autoFocus, onFocus, onBlur, borderColor}) => {

	const [isFocusName, setIsFocusName] = useState(false);
	const [isFocusPrice, setIsFocusPrice] = useState(false);
	
	// useEffect(() => {
	// 	if(isFocus === focus)
	// 		return;
	// 	setIsFocus(focus)
	// }, [focus])

	return (
		<View style={{display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					paddingLeft: 5,
					paddingRight: 5,
					paddingBottom: 15,
					borderRadius: 25}}>
			{/* <View style={{display: 'flex', width: '80%'}}> */}
			<View style={{display: 'flex', flexDirection: 'row', width: '80%'}}>
				<TextInput
					placeholder='Item Name'
					style={isFocusName ? [styles.textInput, { borderColor: borderColor }] : styles.textInput}
					onFocus={(e) => {
						setIsFocusName(true);
						if(onFocus)
							onFocus();
					}}
					onBlur={(e) => {
						setIsFocusName(false);
						if(onBlur)
							onBlur();
					}}
					onChangeText={text => {
						setItemName(text)
					}}
					// autoFocus
					value={item.name}
				/>
				<TextInput
					placeholder='Item Price'
					style={isFocusPrice ? [styles.textInput, { borderColor: borderColor }] : styles.textInput}
					onFocus={(e) => {
						setIsFocusPrice(true);
						if(onFocus)
							onFocus();
					}}
					onBlur={(e) => {
						setIsFocusPrice(false);
						if(onBlur)
							onBlur();
					}}
					onChangeText={text => {
						setItemPrice(text)
					}}
					autoFocus={autoFocus}
					value={item.price}
				/>
			</View>
			<TouchableOpacity style={styles.button} onPress={onRemove}>
				<Ionicons style={styles.iconButton} name="remove-circle" size={25} color={'#e83c3c'} />
			</TouchableOpacity>			
		</View>
	)
}

DayListItem.propTypes = {
	item: PropTypes.object,
	setItemName: PropTypes.func,
	setItemPrice: PropTypes.func,
	onRemove: PropTypes.func,
	focus: PropTypes.bool,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	borderColor: PropTypes.string
}

DayListItem.defaultProps = {
	item: {
		name: '',
		price: ''
	},
	setItemName: () => {},
	setItemPrice: () => {},
	onRemove: null,
	focus: false,
	onFocus: null,
	onBlur: null,
	borderColor: '#989898'
}

const styles = StyleSheet.create({
	textInput: {
		// width: '80%',
		flex: 1,
		height: 40,
		borderColor: '#989898',
		borderWidth: 2,
		borderRadius: 5,
		backgroundColor: '#fff',
		margin: 3,
		padding: 5
	},
	textInputFoucus: {
		borderColor: '#3f50b5',
	},
	iconButton: {
		margin: 5,
	}
  });

export default DayListItem;