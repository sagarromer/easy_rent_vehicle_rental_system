import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

import {
    ALL_VEHICLES_SUCCESS,
    ALL_VEHICLES_FAIL,
    VEHICLE_DETAILS_SUCCESS,
    VEHICLE_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/vehicleConstants'

// Get all vehicles
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
// Get vehicle details
export const getVehicleDetails = (req, id) => async (dispatch) => {
    try {

        const { origin } = absoluteUrl(req);

        let url;

        if (req) {
            url = `${origin}/api/vehicles/${id}`
        } else {
            url = `/api/vehicles/${id}`
        }

        const { data } = await axios.get(url)

        dispatch({
            type: VEHICLE_DETAILS_SUCCESS,
            payload: data.room
        })

    } catch (error) {
        dispatch({
            type: VEHICLE_DETAILS_FAIL,
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