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
export const getVehicles = (req, currentPage = 1,vehicleNumber='',passengers,category) => async (dispatch) => {
    try {

        const { origin } = absoluteUrl(req);
        let link = `${origin}/api/vehicles?page=${currentPage}&vehicleNumber=${vehicleNumber}`

        if (passengers) link = link.concat(`&guestCapacity=${passengers}`)
        if (category) link = link.concat(`&category=${category}`)

        // const { data } = await axios.get(`${origin}/api/vehicles?page=${currentPage}&vehicleNumber=${vehicleNumber}`)
        const { data } = await axios.get(link)

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
            payload: data.vehicle
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