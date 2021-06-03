import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

import {
    ALL_VEHICLES_SUCCESS,
    ALL_VEHICLES_FAIL,
    CLEAR_ERRORS

} from '../constants/vehicleConstants'

// Get all rooms
export const getVehicles = (req) => async (dispatch) => {
    try {

        const { origin } = absoluteUrl(req);

        const { data } = await axios.get(`${origin}/api/vehicles`)

        dispatch({
            type: ALL_VEHICLES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_VEHICLES_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}