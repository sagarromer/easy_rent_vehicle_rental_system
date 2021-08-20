import { combineReducers } from 'redux';
import { allVehiclesReducer, vehicleDetailsReducer, 
    newReviewReducer,checkReviewReducer 
, newVehicleReducer, vehicleReducer} from './vehicleReducers';
import { authReducer, loadedUserReducer, userReducer, forgotPasswordReducer } from './userReducers';
import { checkBookingReducer, bookedDatesReducer, bookingsReducer,
    bookingReducer } from './bookingReducers'


const reducer = combineReducers({
    allVehicles: allVehiclesReducer,
    newVehicle: newVehicleReducer,
    vehicleDetails: vehicleDetailsReducer,
    vehicle: vehicleReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    bookings: bookingsReducer,
    booking: bookingReducer,
    bookingDetails: bookingDetailsReducer,
    newReview: newReviewReducer,
    checkReview: checkReviewReducer


})

export default reducer 