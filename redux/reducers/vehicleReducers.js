import {
    ALL_VEHICLES_SUCCESS,
    ALL_VEHICLES_FAIL,
    CLEAR_ERRORS

} from '../constants/vehicleConstants'


// All rooms reducer
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