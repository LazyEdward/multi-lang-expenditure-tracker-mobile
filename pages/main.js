
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, StyleSheet, Text, TouchableHighlight, View, Image, Alert } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import Day from './day';
import Month from './month';
import Year from './year';
import Setting from './setting';
import { useDispatch, useSelector } from 'react-redux';

import {
	getColor,
	getLanguage,
	getDefaultView
} from '../redux/reducer/setting'

import {
	getTab,
	getDay,
	getMonth,
	getYear,
} from '../redux/reducer/tab'

import {
	getIsEditing,
	getDataLoading
} from '../redux/reducer/data'

import {
	setLoading
} from '../redux/action/loading'

import {
	setTab,
	setDate
} from '../redux/action/tab'

import {
	cancelEdit
} from '../redux/action/data'

import DateUtils from '../utils/DateUtils'
import Splash from '../components/Splash';
import { getLoading } from '../redux/reducer/loading';

import { useTranslation } from 'react-i18next';

const TAB_BAR_ICONS = {
  Day: {
    focused: "settings",
    blur: "settings-outline"
  },
  Month: {
    focused: "settings",
    blur: "settings-outline"
  },
  Year: {
    focused: "settings",
    blur: "settings-outline"
  },
  Setting: {
    focused: "settings",
    blur: "settings-outline"
  },
}

const TAB_BUTTON_LABEL = {
	Setting: "SETTING_TITLE",
	Day: "DAY_TITLE",
	Month: "MONTH_TITLE",
	Year: "YEAR_TITLE",
}

const Main = ({ navigation, splash }) => {
  
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();

	const {
	  loading,
	  baseColor,
	  language,
	  defaultTab,

	  isEditing,
	  allItemsLoading,

	  tab,
	  day,
	  month,
	  year
	} = useSelector(state => ({
	  baseColor: getColor(state.setting),
	  language: getLanguage(state.setting),
	  defaultTab: getDefaultView(state.setting),
	  
	  isEditing: getIsEditing(state.data),
	  allItemsLoading: getDataLoading(state.data),

	  tab: getTab(state.tab),
	  day: getDay(state.tab),
	  month: getMonth(state.tab),
	  year: getYear(state.tab),

	  loading: getLoading(state.loading),
	}))

	useEffect(() => {
		dispatch(setLoading(false))
	}, [])

	useEffect(() => {
		i18n.changeLanguage(language)
	}, [])
	
	useEffect(() => {
		i18n.changeLanguage(language)
	}, [language])

	const getIconName = (route, focused) => {
		let iconName = '';
	  
		if(TAB_BAR_ICONS[route.name]){
		  iconName = focused ? TAB_BAR_ICONS[route.name].focused : TAB_BAR_ICONS[route.name].blur
		}
	  
		return iconName;
	}
	
	const getBarIcon = (route, focused, color, size) => {
		if(route.name === 'Setting')
		return <Ionicons name={getIconName(route, focused)} color={color} size={focused ? size : size * .75}/>
	
		if(route.name === 'Day')
		//   return <Text style={{color: `${color}`, fontSize: focused ? 18 : 18 * .75}}>日</Text>
		return <Text style={{color: `${color}`, fontSize: focused ? 18 : 18 * .75}}>{DateUtils.today.getDate()}</Text>
	
		if(route.name === 'Month')
		//   return <Text style={{color: `${color}`, fontSize: focused ? 18 : 18 * .75}}>月</Text>
		return <Text style={{color: `${color}`, fontSize: focused ? 18 : 18 * .75}}>{DateUtils.months[DateUtils.today.getMonth()]}</Text>
	
		if(route.name === 'Year')
		//   return <Text style={{color: `${color}`, fontSize: focused ? 18 : 18 * .75}}>年</Text>
		return <Text style={{color: `${color}`, fontSize: focused ? 18 : 18 * .75}}>{DateUtils.today.getFullYear()}</Text>
	
	}

	const handleTabChange = (targetTab, navigation) => ({
		tabPress: event => {			

			if(isEditing){
				Alert.alert(
					t("UTILS:WARNING"),
					t("UTILS:DISCARD_CHANGES_WARNING_MSG"),
					[
						{
						  text: t("UTILS:CANCEL"),
						  style: "cancel"
						},
						{
						  text: t("UTILS:OK"),
						  onPress: () => {
							navigation.navigate(targetTab);
							dispatch(cancelEdit());
							setTimeout(() => dispatch(setTab({tab: targetTab})), 100)
						  },
						  style: 'destructive'
						}
					  ],
					{ cancelable: false }
				  );
				event.preventDefault();
				return;
			}

			if(tab === targetTab || allItemsLoading){
				event.preventDefault();
				return;
			}

			setTimeout(() => dispatch(setTab({tab: targetTab})), 100)
		},
	})

	const getTabButtonLabel = (page) => {
		return t(`TAB:${TAB_BUTTON_LABEL[page]}`)
	}

	const getTabLabel = (page) => {
		if(page === 'Setting')
			return t('TAB:SETTING_TITLE');

		let label = `${year}`;

		if(page === 'Month')
			label = `${("0" + month).slice(-2)}/` + label
		if(page === 'Day')
			label = `${("0" + day).slice(-2)}/${("0" + month).slice(-2)}/` + label

		return label
	}

	const handlePrev = (page) => {
		let date = {day: day, month: month, year: year};

		if(page === 'Year' && year > 1971)
			// setYear(year - 1)
			date.year -= 1
		if(page === 'Month'){
			if(month > 1)
				// setMonth(month - 1)
				date.month -= 1
			else{
				if(year > 1971){
					// setMonth(12)
					// setYear(year - 1)
					date.month = 12
					date.year -= 1
				}
			}
		}
		if(page === 'Day'){
			if(day > 1)
				// setDay(day - 1)
				date.day -= 1
			else if (month > 1){
				// setDay(DateUtils.daysInMonth(month - 1))
				// setMonth(month - 1)
				date.day = DateUtils.daysInMonth(date.month - 1)
				date.month -= 1
			}
			else{
				if(year > 1971){
					// setDay(DateUtils.daysInMonth(12))
					// setMonth(12)
					// setYear(year - 1)
					date.day = DateUtils.daysInMonth(date.month - 1)
					date.month = 12
					date.year -= 1
				}
			}
		}

		if(isEditing){
			Alert.alert(
				t("UTILS:WARNING"),
				t("UTILS:DISCARD_CHANGES_WARNING_MSG"),
				[
					{
					  text: t("UTILS:CANCEL"),
					  style: "cancel"
					},
					{
					  text: t("UTILS:OK"),
					  onPress: () => {
						dispatch(cancelEdit());
						setTimeout(() => dispatch(setDate(date)), 100)
					  },
					  style: 'destructive'
					}
				  ],
				{ cancelable: false }
			  );
		}
		else
			setTimeout(() => dispatch(setDate(date)), 100)

	}

	const handleNext = (page) => {
		let date = {day: day, month: month, year: year};

		if(page === 'Year' && year < 2050)
			// setYear(year + 1)
			date.year += 1
		if(page === 'Month'){
			if(month < 12)
				// setMonth(month + 1)
				date.month += 1
			else{
				if(year < 2050){
					// setMonth(1)
					// setYear(year + 1)
					date.month = 1
					date.year += 1
				}
			}
		}
		if(page === 'Day'){
			if(day < DateUtils.daysInMonth(month))
				// setDay(day + 1)
				date.day += 1
			else if (month < 12){
				// setDay(1)
				// setMonth(month + 1)
				date.day = 1
				date.month += 1
			}
			else{
				if(year < 2050){
					// setDay(1)
					// setMonth(1)
					// setYear(year + 1)
					date.day = 1
					date.month = 1					
					date.year += 1					
				}
			}
		}
		
		if(isEditing){
			Alert.alert(
				t("UTILS:WARNING"),
				t("UTILS:DISCARD_CHANGES_WARNING_MSG"),
				[
					{
					  text: t("UTILS:CANCEL"),
					  style: "cancel"
					},
					{
					  text: t("UTILS:OK"),
					  onPress: () => {
						dispatch(cancelEdit());
						setTimeout(() => dispatch(setDate(date)), 100)
					  },
					  style: 'destructive'
					}
				  ],
				{ cancelable: false }
			  );
		}
		else
			setTimeout(() => dispatch(setDate(date)), 100)

	}

	const Tabs = createBottomTabNavigator();

	return (
        <SafeAreaProvider>
          {splash || loading ? 
            <Splash/>
          :
            <NavigationContainer>
              <Tabs.Navigator
				backBehavior="none"
				screenOptions={({route}) => ({
                  // headerShown: false,
                  headerTintColor: '#fff',
                  headerStyle: [styles.header, { backgroundColor: baseColor}],
                  headerLeft: ({tintColor}) => {
                    let setting = route.name === 'Setting'
                    return setting ? null : <View style={styles.iconView}><TouchableHighlight underlayColor='#ffffff55' onPress={() => handlePrev(route.name)} style={{borderRadius: 50}}><AntDesign style={styles.iconButton} color={tintColor} name="left"/></TouchableHighlight></View>
                  },
                  headerRight: ({tintColor}) => {
                    let setting = route.name === 'Setting'
                    return setting ? null : <View style={styles.iconView}><TouchableHighlight underlayColor='#ffffff55' onPress={() => handleNext(route.name)} style={{borderRadius: 50}}><AntDesign style={styles.iconButton} color={tintColor} name="right"/></TouchableHighlight></View>
                  },
                  headerTitle: getTabLabel(route.name),
                  headerTitleAlign: 'center',
				  tabBarLabel: getTabButtonLabel(route.name),
                  tabBarIcon: ({ focused, color, size }) => getBarIcon(route, focused, color, size),
                  tabBarActiveTintColor: baseColor,				  
                })}
				initialRouteName={defaultTab}
              >
                <Tabs.Screen name='Day' component={Day}
					listeners={({navigation}) => handleTabChange("Day", navigation)}
				/>
                <Tabs.Screen name='Month' component={Month}
					listeners={({navigation}) => handleTabChange("Month", navigation)}
				/>
                <Tabs.Screen name='Year' component={Year}
					listeners={({navigation}) => handleTabChange("Year", navigation)}
				/>
                <Tabs.Screen name='Setting' component={Setting}
					listeners={({navigation}) => handleTabChange("Setting", navigation)}
				/>
              </Tabs.Navigator>
            </NavigationContainer>
        }
        </SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	container: {
	  backgroundColor: '#C8C8C8',
	},
	header: {
	  backgroundColor: '#3f50b5',
	},
	iconView: {
	  paddingLeft: 10,
	  paddingRight: 10,
	},
	iconButton: {
	  margin: 10,
	}
});

export default Main;