import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

import {
    ALL_VEHICLES_SUCCESS,
    ALL_VEHICLES_FAIL,
    VEHICLE_DETAILS_SUCCESS,
    VEHICLE_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    REVIEW_AVAILABILITY_REQUEST,
    REVIEW_AVAILABILITY_SUCCESS,
    REVIEW_AVAILABILITY_FAIL,
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
export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/reviews`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}
export const checkReviewAvailability = (vehicleId) => async (dispatch) => {
    try {

        dispatch({ type: REVIEW_AVAILABILITY_REQUEST })

        const { data } = await axios.get(`/api/reviews/check_review_availability?vehicleId=${vehicleId}`)

        dispatch({
            type: REVIEW_AVAILABILITY_SUCCESS,
            payload: data.isReviewAvailable
        })

    } catch (error) {
        dispatch({
            type: REVIEW_AVAILABILITY_FAIL,
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