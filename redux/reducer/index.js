import { combineReducers } from 'redux'
import Loading from './loading'

import Data from './data'

import TestReducer from './testReducer'
import Setting from './setting'
import Tab from './tab'

const reducer = combineReducers({
	loading: Loading,

	data: Data,

	test: TestReducer,
	setting: Setting,
	tab: Tab
})

export default reducer