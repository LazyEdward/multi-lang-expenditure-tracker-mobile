
import {
	TEST
} from '../type'

let initState = {
	test: 'test'
}

export default TestReducer = (state = initState, action) => {

	switch(action.type) {
		case TEST:
			return {...state, test: action.payload}
		default:
			return state
	}

}

export const getTest = (state) => state.test;