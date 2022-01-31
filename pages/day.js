import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View, Alert } from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';

import {
	getTab,
	getDay,
	getMonth,
	getYear,
} from '../redux/reducer/tab'

import {
	getColor
} from '../redux/reducer/setting'

import {
	getData,
	getDataLoading
} from '../redux/reducer/data'

import {
	setDayItems
} from '../redux/action/data'

import Loading from '../components/Loading'
import DayListItem from '../components/DayListItem';
import { isPriceOnEntering } from '../utils/Validation'

import { useTranslation } from 'react-i18next';

const Day = ({ navigation }) => {

	const { t } = useTranslation();
	const dispatch = useDispatch();
	const {
		baseColor,
		allItems,
		allItemsLoading,

		tab,
		day,
		month,
		year
	} = useSelector(state => ({
		baseColor: getColor(state.setting),
		allItems: getData(state.data),
		allItemsLoading: getDataLoading(state.data),

		tab: getTab(state.tab),
		day: getDay(state.tab),
		month: getMonth(state.tab),
		year: getYear(state.tab),
	}))

	const [total, setTotal] = useState(0)
	const [items, setItems] = useState([]);
	
	const [autoFocus, setAutoFocus] = useState(false);

	const setItemName = (index, text) => {
		let newItems = [...items];

		newItems[index].name = text;
		console.log(newItems)
		setItems(newItems);
	}

	const setItemPrice = (index, price) => {
		let newItems = [...items];

		if(!isPriceOnEntering(price)){
			Alert.alert(
				t("UTILS:WARNING"),
				t("DAY:VALID_PRICE_WARNING_MSG"),
				[{ text: t("UTILS:OK"), }],
				{ cancelable: false }
			  );

			return;
		}

		if((total + parseFloat(price) > 1000000)
			|| (total + parseFloat(price) < -1000000)){
			Alert.alert(
				t("UTILS:WARNING"),
				t("DAY:BEYOND_RANGE_WARNING_MSG"),
				[{ text: t("UTILS:OK"), }],
				{ cancelable: false }
			  );

			return;
		}

		newItems[index].price = price;
		setItems(newItems);
	}

	const removeItemAt = (index) => setItems([...items.slice(0, index), ...items.slice(index + 1)]);

	const addItem = () => {
		let totalItems = items.length;

		setItems([...items, {
			name: `${t('DAY:ITEM')} ${totalItems + 1}`,
			price: ''
		}]);

		setAutoFocus(true)
	}

	const confirmSaveEdit = () => {
		Alert.alert(
			t("DAY:SAVE_EDIT_WARNING"),
			t("DAY:SAVE_EDIT_WARNING_MSG"),
			[
			  {
				text: t("UTILS:CANCEL"),
				style: "cancel"
			  },
			  {
				text: t("UTILS:OK"),
				onPress: () => saveEdit(),
				style: 'destructive'
			  }
			],
			{ cancelable: false }
		  );
	}

	const saveEdit = () => {
		dispatch(setDayItems({items, day, month, year}));
		Keyboard.dismiss();
	}

	useEffect(() => {
		console.log(allItems)
		if(allItems[year] && allItems[year][month] && allItems[year][month][day]){
			if(allItems[year][month][day].items.length > 0)
				setItems([...allItems[year][month][day].items])
			else
				setItems([])
		}
		else
			setItems([])

		setAutoFocus(false)
	}, [allItems, year, month, day, tab])

	useEffect(() => {
		setTotal(items.filter(item => !isNaN(parseFloat(item.price))).map(item => parseFloat(item.price) * 1000).reduce((a, b) => {return a + b} , 0.0) / 1000);
	}, [items])

	return (
		<SafeAreaView style={styles.container}>
			{allItemsLoading ? <Loading/> : null}			
			<View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingBottom: 15, width: '100%'}}>
				<Text>{t("DAY:TOTAL")} </Text>
				<Text>{`$ ${total}`}</Text>
			</View>
			<ScrollView style={styles.scroll} keyboardShouldPersistTaps='always'>
				{items.map((item, index) => (
					<DayListItem
						key={index}
						item={item}
						autoFocus={autoFocus}
						borderColor={baseColor}
						setItemName={(text) => setItemName(index, text)}
						setItemPrice={(price) => setItemPrice(index, price)}
						onRemove={() => removeItemAt(index)}
					/>
				))}
			</ScrollView>
			<View style={{width: '90%', display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
				<TouchableHighlight style={[styles.button, { backgroundColor: baseColor}]} underlayColor={baseColor + 'CC'} onPress={addItem}>
					<Text style={{color: '#fff'}}>{t("DAY:ADD_ITEM")}</Text>
				</TouchableHighlight>
				<TouchableHighlight style={[styles.iconButton, { backgroundColor: baseColor}]} underlayColor={baseColor + 'CC'} onPress={confirmSaveEdit}>
					<AntDesign size={20} color={"#fff"} name="save"/>
				</TouchableHighlight>
			</View>
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
	iconButton: {
		// width: '90%',
		height: 40,
		width: 40,
		margin: 5,
		padding: 5,
		borderRadius: 5,
		backgroundColor: '#3f50b5',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		// width: '90%',
		flex: 1,
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