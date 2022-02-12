import {
	SET_LOADING,
	RESET
} from '../type'

export const setLoading = (loading) => {
	return {type: SET_LOADING, payload: loading}
}

export const reset = (reset) => {
	return {type: RESET, payload: reset}
}