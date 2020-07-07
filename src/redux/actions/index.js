import streams from "../../apis/streams";
import {Types} from "./types";
import history from "../../history";

export const signIn = (userId) => ({
	type: Types.SIGN_IN,
	payload: userId
})

export const signOut = () => ({
	type: Types.SIGN_OUT
})

export const createStream = formValues => async (dispatch, getState) => {
	const {userId} = getState().auth;
	const response = await streams.post('/streams', {...formValues, userId})
	dispatch({type: Types.CREATE_STREAM, payload: response.data})
	history.push('/')
}

export const fetchStreams = () => async dispatch => {
	const response = await streams.get('/streams')

	dispatch({type: Types.FETCH_STREAMS, payload: response.data})
}

export const fetchStream = id => async dispatch => {
	const response = await streams.get(`/streams/${id}`)

	dispatch({type: Types.FETCH_STREAM, payload: response.data})
}

export const updateStream = (id, values) => async dispatch => {
	const response = await streams.patch(`/streams/${id}`, values)

	dispatch({type: Types.UPDATE_STREAM, payload: response.data})
	history.push('/')
}

export const deleteStream = id => async dispatch => {
	await streams.delete(`/streams/${id}`)
	history.push('/')

	dispatch({type: Types.DELETE_STREAM, payload: id})
}
