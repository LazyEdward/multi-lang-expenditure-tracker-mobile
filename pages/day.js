import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import DayListItem from '../components/DayListItem';

import {
	getColor
} from '../redux/reducer/setting'

const Day = ({ navigation }) => {

	const dispatch = useDispatch();
	const {
		baseColor
	} = useSelector(state => ({
		baseColor: getColor(state.setting)
	}))

	const [items, setItems] = useState([]);

	const setItemAt = (index, text) => {
		let newItems = [...items];

		newItems[index] = text;
		setItems(newItems);
	}

	const removeItemAt = (index) => setItems([...items.slice(0, index), ...items.slice(index + 1)]);

	const addItem = () => {
		setItems([...items, '']);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scroll} keyboardShouldPersistTaps='always'>
				{/* <View style={{alignItems: 'center'}}>
					<TextInput
						style={styles.textInput}
						onFocus={(e) => alert(e.style)}
						onChangeText={text => setTestText(text)}
						value={testText}
					/>
				</View> */}
				{items.map((item, index) => (
					<DayListItem
						key={index}
						value={item}
						borderColor={baseColor}
						setValue={(text) => setItemAt(index, text)}
						onRemove={() => removeItemAt(index)}
					/>
				))}
			</ScrollView>
			<TouchableHighlight style={[styles.button, { backgroundColor: baseColor}]} underlayColor={baseColor + 'CC'} onPress={addItem}>
				<Text style={{color: '#fff'}}>Test</Text>
			</TouchableHighlight>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	//   backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'flex-start',
	},
	scroll: {
		width: '100%',
		flex: 1,
	},
	text: {
		marginBottom: 5,
	},	
	// textInput: {
	// 	width: '90%',
	// 	height: 40,
	// 	borderColor: '#3f50b5',
	// 	borderWidth: 2,
	// 	borderRadius: 5,
	// 	backgroundColor: '#fff',
	// 	margin: 3,
	// 	padding: 5
	// },
	button: {
		width: '90%',
		height: 40,
		margin: 5,
		padding: 5,
		borderRadius: 5,		
		backgroundColor: '#3f50b5',
		alignItems: 'center',
		justifyContent: 'center',
	}
  });

export default Day;