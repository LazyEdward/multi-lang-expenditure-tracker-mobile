import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import DateUtils from '../../utils/DateUtils'

import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

const YearCalendar = ({year, allItems, color, onPress}) => {

	const { t } = useTranslation();

	const [items, setItems] = useState([]);

	const handleCalendarData = async() => {
		let items = [];
		let season = 0;
		let start = 0;

		items[season] = []

		let months = DateUtils.months

		for(let month = 1; month <= months.length; month++){

			let days = DateUtils.daysInMonth(month, year);

			if(!items[season])
				items[season] = []

			items[season][start] = {month: months[month - 1], monthNumber: month, total: 0}

			for(let day = 1; day <= days; day++){
				if(allItems && allItems[year] && allItems[year][month] && allItems[year][month][day] && allItems[year][month][day].total){
					items[season][start].total += allItems[year][month][day].total * 1000
				}
			}

			if(items[season][start].total)
				items[season][start].total /= 1000

			start++;

			if(month % 3 === 0){
				season++;
				start = 0;
			}

		}

		console.log(items)

		setItems(items)
	}

	useEffect(() => {
		handleCalendarData()
	}, [allItems, year])

	return (
		<View style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, padding: 5}}>
			{items.length > 0 && items.map((row, index) => (
				<View key={year+'_row_' + index} style={styles.monthRow}>
					{row.map((val, subIndex) => (
						<TouchableHighlight key={year+val.month + subIndex}
							style={[styles.monthBlockStyle,
								subIndex === 2 ? { borderRightWidth: 1 }
								: {},
								index === items.length - 1 ? { borderBottomWidth: 1 }
								: {},
								subIndex === 0 && index === 0 ? { borderTopLeftRadius: 5 }
								: {},
								subIndex === 2 && index === 0 ? { borderTopRightRadius: 5 }
								: {},
								subIndex === 0 && index === items.length - 1 ? { borderBottomLeftRadius: 5 }
								: {},
								subIndex === 2 && index === items.length - 1 ? { borderBottomRightRadius: 5 }
								: {},
							]}
							underlayColor={color+'33'}
							onPress={() => onPress(val)}
						>
							<View style={{display: 'flex', flex: 1, alignItems: 'center'}}>
								<Text style={{flex: 0.5, color: '#000'}}				
								>
									{val ? val.month : ''}
								</Text>
								{val && val.total ?
									<Text style={[styles.totalTag, { backgroundColor: color }]}>{`$${val.total}`}</Text>
									: null
								}
							</View>
						</TouchableHighlight>
					))}
				</View>
			))}
		</View>
	)
}

YearCalendar.propTypes = {
	year: PropTypes.number,
	allItems: PropTypes.object,
	color: PropTypes.string,
	onPress: PropTypes.func,
}

YearCalendar.defaultProps = {
	year: DateUtils.today.getFullYear(),
	allItems: null,
	color: '#000',
	onPress: () => {}
}

const styles = StyleSheet.create({
	monthRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		flex: 1,
		paddingLeft: 2,
		paddingRight: 2,		
	},
	monthBlockStyle: {
		borderLeftWidth: 1,	
		borderTopWidth: 1,	
		borderColor: '#C8C8C8',
		flex: 3,
		display: 'flex',
		// flexDirection: 'row',
        // justifyContent: 'center'
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	totalTag: {
		margin: 2,
		padding: 2,
		color: '#fff',
		fontSize: 12,
		borderRadius: 5
	}
});

export default YearCalendar;