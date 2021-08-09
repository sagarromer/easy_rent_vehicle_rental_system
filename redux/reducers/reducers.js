import { combineReducers } from 'redux';
import { allVehiclesReducer, vehicleDetailsReducer, 
    newReviewReducer,checkReviewReducer 
, newVehicleReducer} from './vehicleReducers';
import { authReducer, loadedUserReducer, userReducer, forgotPasswordReducer } from './userReducers';
import { checkBookingReducer, bookedDatesReducer, bookingsReducer } from './bookingReducers'


const reducer = combineReducers({
    allVehicles: allVehiclesReducer,
    newVehicle: newVehicleReducer,
    vehicleDetails: vehicleDetailsReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    bookings: bookingsReducer,
    bookingDetails: bookingDetailsReducer,
    newReview: newReviewReducer,
    checkReview: checkReviewReducer


})

export default reducer 