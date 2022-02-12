import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	setTab,
	setDate
} from '../redux/action/tab'

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

import DateUtils from '../utils/DateUtils'

import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { useTranslation } from 'react-i18next';

import YearCalendar from '../components/YearCalendar';

const Year = ({ navigation }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const {
		baseColor,
		allItems,


		tab,

		year
	} = useSelector(state => ({
		baseColor: getColor(state.setting),
		allItems: getData(state.data),		

		tab: getTab(state.tab),

		year: getYear(state.tab),
	}))

	const [total, setTotal] = useState(0)

	const jumpToPage = (targetDate) => {
		if(!targetDate)
			return;

		console.log(targetDate)

		let date = {day: 1, month: targetDate.monthNumber, year: year};

		dispatch(setDate(date))
		dispatch(setTab({tab: "Month"}))

		navigation.navigate("Month");
	}

	useEffect(() => {
		let total = 0;
		if(allItems[year]){
			for(let month = 1; month <= 12; month++){
				if(!allItems[year][month])
					continue;

				let days = DateUtils.daysInMonth(month, year);
	
				for(let day = 1; day <= days; day++){
					if(allItems[year][month][day] && allItems[year][month][day].total)
						total += allItems[year][month][day].total;
				}
			}
		}

		setTotal(total)

	}, [allItems, year, tab])

	return (
		<SafeAreaView style={styles.container}>			
			<View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingBottom: 15, width: '100%'}}>
				<Text>{t("UTILS:TOTAL")} </Text>
				<Text>{`$ ${total}`}</Text>
			</View>
			<YearCalendar
				year={year}
				allItems={allItems ? allItems : null}
				color={baseColor}
				onPress={jumpToPage}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'flex-start',
	},
  });

export default Year;