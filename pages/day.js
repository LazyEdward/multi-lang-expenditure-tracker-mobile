import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import DayListItem from '../components/DayListItem';

import {
	getColor
} from '../redux/reducer/setting'

import { isPriceOnEntering } from '../utils/Validation'

const Day = ({ navigation }) => {

	const dispatch = useDispatch();
	const {
		baseColor
	} = useSelector(state => ({
		baseColor: getColor(state.setting)
	}))

	const [total, setTotal] = useState(0)
	const [items, setItems] = useState([]);

	const setItemName = (index, text) => {
		let newItems = [...items];

		newItems[index].name = text;
		console.log(newItems)
		setItems(newItems);
	}

	const setItemPrice = (index, price) => {
		let newItems = [...items];

		if(!isPriceOnEntering(price)){
			alert('Please enter a valid price');
			return;
		}

		newItems[index].price = price;
		setItems(newItems);
	}

	const removeItemAt = (index) => setItems([...items.slice(0, index), ...items.slice(index + 1)]);

	const addItem = () => {
		let totalItems = items.length;

		setItems([...items, {
			name: `Item ${totalItems + 1}`,
			price: ''
		}]);
	}

	useEffect(() => {
		setTotal(items.filter(item => !isNaN(parseFloat(item.price))).map(item => parseFloat(item.price) * 1000).reduce((a, b) => {return a + b} , 0.0) / 1000);
	}, [items])

	return (
		<SafeAreaView style={styles.container}>
			<View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingBottom: 15, width: '100%'}}>
				<Text>Total: </Text>
				<Text>{`$ ${total}`}</Text>
			</View>
			<ScrollView style={styles.scroll} keyboardShouldPersistTaps='always'>
				{items.map((item, index) => (
					<DayListItem
						key={index}
						item={item}
						borderColor={baseColor}
						setItemName={(text) => setItemName(index, text)}
						setItemPrice={(price) => setItemPrice(index, price)}
						onRemove={() => removeItemAt(index)}
					/>
				))}
			</ScrollView>
			<TouchableHighlight style={[styles.button, { backgroundColor: baseColor}]} underlayColor={baseColor + 'CC'} onPress={addItem}>
				<Text style={{color: '#fff'}}>Add Item</Text>
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