import { combineReducers } from 'redux'
import Loading from './loading'

import TestReducer from './testReducer'
import Setting from './setting'
import Tab from './tab'

const reducer = combineReducers({
	loading: Loading,

	test: TestReducer,
	setting: Setting,
	tab: Tab
})

export default reducer