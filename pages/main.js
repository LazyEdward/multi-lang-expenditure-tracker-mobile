
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import Day from './day';
import Month from './month';
import Year from './year';
import Setting from './setting';
import { useDispatch, useSelector } from 'react-redux';

import {
	getColor,
	getDefaultView
} from '../redux/reducer/setting'

import {
	getTab,
	getDay,
	getMonth,
	getYear,
} from '../redux/reducer/tab'

import {
	setLoading
} from '../redux/action/loading'

import {
	setTab,
	setDate
} from '../redux/action/tab'

import DateUtils from '../utils/DateUtils'
import Splash from '../components/Splash';
import { getLoading } from '../redux/reducer/loading';

const Tabs = createBottomTabNavigator();

const TabBarIcons = {
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

const getIconName = (route, focused) => {
  let iconName = '';

  if(TabBarIcons[route.name]){
    iconName = focused ? TabBarIcons[route.name].focused : TabBarIcons[route.name].blur
  }

  return iconName;
}

const getBarIcon = (route, focused, color, size) => {
    if(route.name === 'Setting')
      return <Ionicons name={getIconName(route, focused)} color={color} size={focused ? size : size * .75}/>

    if(route.name === 'Day')
      return <Text style={{color: `${color}`, fontSize: focused ? 18 : 18 * .75}}>日</Text>

    if(route.name === 'Month')
      return <Text style={{color: `${color}`, fontSize: focused ? 18 : 18 * .75}}>月</Text>

    if(route.name === 'Year')
      return <Text style={{color: `${color}`, fontSize: focused ? 18 : 18 * .75}}>年</Text>

}

const Main = ({ navigation, splash }) => {
  
	const dispatch = useDispatch();

	const {
	  loading,
	  baseColor,
	  defaultTab,

	  tab,
	  day,
	  month,
	  year
	} = useSelector(state => ({
	  baseColor: getColor(state.setting),
	  defaultTab: getDefaultView(state.setting),
	  
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
		console.log(tab)
	}, [tab])
	
	// const [day, setDay] = useState(DateUtils.today.getDate());
	// const [month, setMonth] = useState(DateUtils.today.getMonth() + 1);
	// const [year, setYear] = useState(DateUtils.today.getFullYear());	

	const handleTabChange = (targetTab) => ({
		tabPress: event => {
			if(tab === targetTab)
				return;

			setTimeout(() => dispatch(setTab({tab: targetTab})), 100)
		},
	})

	const getTabLabel = (page) => {
		if(page === 'Setting')
			return 'Setting';

		let label = `${year}`;

		if(page === 'Month')
			label = `${month}/` + label
		if(page === 'Day')
			label = `${day}/${month}/` + label

		return(label)
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
		
		setTimeout(() => dispatch(setDate(date)), 100)
	}

	return (
        <SafeAreaProvider>
          {splash || loading ? 
            <Splash/>
          :
            <NavigationContainer style={styles.container}>
              <Tabs.Navigator			  
                  screenOptions={({route}) => ({
                  // headerShown: false,
                  headerTintColor: '#fff',
                  headerStyle: [styles.header, { backgroundColor: baseColor}],
                  headerLeft: ({tintColor}) => {
                    let setting = route.name === 'Setting'
                    return setting ? null : <View style={styles.iconView}><TouchableHighlight underlayColor='#ffffffcc' onPress={() => handlePrev(route.name)} style={{borderRadius: 50}}><AntDesign style={styles.iconButton} color={tintColor} name="left"/></TouchableHighlight></View>
                  },
                  headerRight: ({tintColor}) => {
                    let setting = route.name === 'Setting'
                    return setting ? null : <View style={styles.iconView}><TouchableHighlight underlayColor='#ffffffcc' onPress={() => handleNext(route.name)} style={{borderRadius: 50}}><AntDesign style={styles.iconButton} color={tintColor} name="right"/></TouchableHighlight></View>
                  },
                  headerTitle: getTabLabel(route.name),
                  headerTitleAlign: 'center',
                  tabBarIcon: ({ focused, color, size }) => getBarIcon(route, focused, color, size),
                  tabBarActiveTintColor: baseColor,
                })}
				initialRouteName={defaultTab}
              >
                <Tabs.Screen name="Day" component={Day}
					listeners={() => handleTabChange("Day")}
				/>
                <Tabs.Screen name="Month" component={Month}
					listeners={() => handleTabChange("Month")}
				/>
                <Tabs.Screen name="Year" component={Year}
					listeners={() => handleTabChange("Year")}				
				/>
                <Tabs.Screen name="Setting" component={Setting}
					listeners={() => handleTabChange("Setting")}
				/>
                {/* <Tabs.Screen name="Day" component={Day}/>
                <Tabs.Screen name="Month" component={Month}/>
                <Tabs.Screen name="Year" component={Year}/>
                <Tabs.Screen name="Setting" component={Setting}/> */}
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