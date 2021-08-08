import {
    ALL_VEHICLES_SUCCESS,
    ALL_VEHICLES_FAIL,
    VEHICLE_DETAILS_SUCCESS,
    VEHICLE_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    REVIEW_AVAILABILITY_REQUEST,
    REVIEW_AVAILABILITY_SUCCESS,
    REVIEW_AVAILABILITY_FAIL,
    ADMIN_VEHICLES_REQUEST,
    ADMIN_VEHICLES_SUCCESS,
    ADMIN_VEHICLES_FAIL,
    CLEAR_ERRORS

} from '../constants/vehicleConstants'


// All vehicles reducer
export const allVehiclesReducer = (state = { vehicles: [] }, action) => {
    switch (action.type) {
        case ADMIN_VEHICLES_REQUEST:
            return {
                loading: true,
            }
        case ALL_VEHICLES_SUCCESS:
            return {
                vehiclesCount: action.payload.vehiclesCount,
                resPerPage: action.payload.resPerPage,
                filteredVehiclesCount: action.payload.filteredVehiclesCount,
                vehicles: action.payload.vehicles
            }
        case ADMIN_VEHICLES_SUCCESS:
            return {
                loading: false,
                rooms: action.payload
            }
        case ALL_VEHICLES_FAIL:
        case ADMIN_VEHICLES_FAIL:
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

export const checkReviewReducer = (state = { reviewAvailable: null }, action) => {
    switch (action.type) {
        case REVIEW_AVAILABILITY_REQUEST:
            return {
                loading: true
            }

        case REVIEW_AVAILABILITY_SUCCESS:
            return {
                loading: false,
                reviewAvailable: action.payload
            }

        case REVIEW_AVAILABILITY_FAIL:
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