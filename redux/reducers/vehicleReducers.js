import {
    ALL_VEHICLES_SUCCESS,
    ALL_VEHICLES_FAIL,
    VEHICLE_DETAILS_SUCCESS,
    VEHICLE_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS

} from '../constants/vehicleConstants'


// All vehicles reducer
export const allVehiclesReducer = (state = { vehicles: [] }, action) => {
    switch (action.type) {

        case ALL_VEHICLES_SUCCESS:
            return {
                vehiclesCount: action.payload.vehiclesCount,
                resPerPage: action.payload.resPerPage,
                filteredVehiclesCount: action.payload.filteredVehiclesCount,
                vehicles: action.payload.vehicles
            }

        case ALL_VEHICLES_FAIL:
            return {
                error: action.payload
            }

        default:
            return state
    }
}
// Vehicle details reducer
export const vehicleDetailsReducer = (state = { vehicle: {} }, action) => {
    switch (action.type) {
        case VEHICLE_DETAILS_SUCCESS:
            return {
                vehicle: action.payload
            }

        case VEHICLE_DETAILS_FAIL:
            return {
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
} 
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                success: false
            }

        case NEW_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}