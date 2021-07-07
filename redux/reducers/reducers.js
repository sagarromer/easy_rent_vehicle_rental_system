import { combineReducers } from 'redux';
import { allVehiclesReducer, vehicleDetailsReducer } from './vehicleReducers';
import { authReducer, loadedUserReducer, userReducer, forgotPasswordReducer } from './userReducers';
import { checkBookingReducer } from './bookingReducers'


const reducer = combineReducers({
    allVehicles: allVehiclesReducer,
    vehicleDetails: vehicleDetailsReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,

})

export default reducer 