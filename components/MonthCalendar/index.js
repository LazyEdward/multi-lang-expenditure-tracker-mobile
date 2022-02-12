import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import DateUtils from '../../utils/DateUtils'

import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

const MonthCalendar = ({month, year, allItems, color, onPress}) => {

	const { t } = useTranslation();

	const [items, setItems] = useState([]);

	const handleCalendarData = async() => {
		let itemsByweek = [];

		let days = DateUtils.daysInMonth(month, year);
		let offset = DateUtils.getWeekDay(1, month, year);

		let blockSize = (days + offset) % 7 ? days + offset - ((days + offset) % 7) + 7 : days + offset
		// let blockSize = days + offset

		let offseted = Array.apply(null, Array(blockSize));		

		for(let day = 1; day <= days; day++){
			offseted[(day - 1)+offset] = {day: day}

			if(DateUtils.isToday(day, month, year))
				offseted[(day - 1)+offset].today = true;

			if(allItems && allItems[year] && allItems[year][month] && allItems[year][month][day] && allItems[year][month][day].total){
				offseted[(day - 1)+offset].total = allItems[year][month][day].total
			}
		}

		let start = 0;

		while(start < days + offset){
			itemsByweek.push(offseted.slice(start, start+7))
			start += 7
		}

		console.log(itemsByweek)
		setItems(itemsByweek)
	}

	useEffect(() => {
		handleCalendarData()
	}, [allItems, year, month])

	return (
		<View style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, padding: 5}}>
			<View style={[styles.calendarRow, {flex: 0, height: 25}]}>
				{DateUtils.weekdays.map((val, index) => (
					<View key={year+month+val} style={[styles.calendarBlockStyle,
						index === 6 ? { borderRightWidth: 1, borderTopRightRadius: 5 }
						: {},
						index === 0 ? { borderTopLeftRadius: 5 }
						: {}
					]}>
						<Text style={
								index === 0 ? { color: '#3f50b5' } :
								(
									index === 6 ? { color: '#ff0000' }
									: {}
								)
							}				
						>
							{val}
						</Text>
					</View>
				))}
			</View>
			{items.length > 0 && items.map((row, index) => (
				<View key={year+month+'_row_' + index} style={styles.calendarRow}>
					{row.map((val, subIndex) => (
						<TouchableHighlight key={val ? (year+month+val.day + subIndex) : (year+month+'offset' + subIndex)}
							style={[styles.calendarBlockStyle,
								subIndex === 6 ? { borderRightWidth: 1 }
								: {},
								index === items.length - 1 ? { borderBottomWidth: 1 }
								: {},
								subIndex === 0 && index === items.length - 1 ? { borderBottomLeftRadius: 5 }
								: {},
								subIndex === 6 && index === items.length - 1 ? { borderBottomRightRadius: 5 }
								: {},
								val && val.today ? {backgroundColor: "#E3E3E3"} : {}
							]}
							underlayColor={color+'33'}
							onPress={() => onPress(val)}
						>
							<View style={{display: 'flex', flex: 1, alignItems: 'center'}}>
								<Text style={[{flex: 0.5},
										subIndex === 0 ? {
											color: '#3f50b5'
										} : (
											subIndex === 6 ? {
												color: '#ff0000'
											}
											: {
												color: '#000'
											}
										)
									]}				
								>
									{val ? val.day : ''}
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

MonthCalendar.propTypes = {
	month: PropTypes.number,
	year: PropTypes.number,
	allItems: PropTypes.object,
	color: PropTypes.string,
	onPress: PropTypes.func,
}

MonthCalendar.defaultProps = {
	month: DateUtils.today.getMonth() + 1,
	year: DateUtils.today.getFullYear(),
	allItems: null,
	color: '#000',
	onPress: () => {}
}

const styles = StyleSheet.create({
	calendarRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		flex: 1,
		paddingLeft: 2,
		paddingRight: 2,		
	},
	calendarBlockStyle: {
		borderLeftWidth: 1,	
		borderTopWidth: 1,	
		borderColor: '#C8C8C8',
		flex: 6,
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
		fontSize: 9,
		borderRadius: 5
	}
});

export default MonthCalendar;