import { combineReducers } from 'redux';
import { allVehiclesReducer, vehicleDetailsReducer } from './vehicleReducers';
import { authReducer, loadedUserReducer, userReducer, forgotPasswordReducer } from './userReducers';
import { checkBookingReducer, bookedDatesReducer, bookingsReducer } from './bookingReducers'


const reducer = combineReducers({
    allVehicles: allVehiclesReducer,
    vehicleDetails: vehicleDetailsReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    bookings: bookingsReducer,
    bookingDetails: bookingDetailsReducer

})

export default reducer 