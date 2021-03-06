const DateUtils = {
	today: new Date(),
	weekdays : ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
	months : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	
	isLeap : (year) => {
		if (year % 400 === 0)
			return 1
		if (year % 100 === 0)
			return 0
		if (year % 4 === 0)
			return 1
		else
			return 0
	},
	
	isToday : (day, month, year) => {
		let today = DateUtils.today;
		console.log(today)
		return today.getDate() === day && today.getMonth() === (month - 1) && today.getFullYear() === year;
	},

	daysInMonth : (month, year) => {
		return (month === 2) ? (28 + DateUtils.isLeap(year)) : 31 - (month - 1) % 7 % 2;
	},
	
	// https://stackoverflow.com/questions/17964170/get-the-weekday-from-a-date-object-or-date-string-using-javascript
	getWeekDay : (day, month, year) => {
		var dow = new Date(year + '-' + (("0" + month).slice(-2)) + '-' + (("0" + day).slice(-2))).getDay();
		return dow;
	}

}

export default DateUtils;