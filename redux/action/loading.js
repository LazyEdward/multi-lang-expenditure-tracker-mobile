import {
	SET_LOADING
} from '../type'

export const setLoading = (loading) => {
	return {type: SET_LOADING, payload: loading}
}