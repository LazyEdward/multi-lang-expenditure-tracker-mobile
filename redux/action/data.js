import {
	SET_DAY_ITEM,
	SET_DAY_ITEM_DONE
} from '../type'

import {
	getData
} from '../reducer/data'

export const setDayItems = ({items, day, month, year}) => (dispatch, getState) => {

	dispatch({type: SET_DAY_ITEM})

	const overAlldata = getData(getState().data);
	let newData = JSON.parse(JSON.stringify(overAlldata));

	if(!newData[year])
		newData[year] = {}

	if(!newData[year][month])
		newData[year][month] = {}

	if(!newData[year][month][day])
		newData[year][month][day] = {}

	newData[year][month][day].items = items

	newData[year][month][day].items.forEach(item => {
		if(item.price.length < 1)
			item.price = '0'
	});

	if(items.length > 0)
		newData[year][month][day].total = items.filter(item => !isNaN(parseFloat(item.price))).map(item => parseFloat(item.price) * 1000).reduce((a, b) => {return a + b} , 0.0) / 1000;

	console.log(newData)	

	return setTimeout(() => dispatch({type: SET_DAY_ITEM_DONE, payload: newData}), 500);
}