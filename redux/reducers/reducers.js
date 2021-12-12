import { combineReducers } from 'redux';
import { allVehiclesReducer, vehicleDetailsReducer, 
    newReviewReducer,checkReviewReducer 
, newVehicleReducer, vehicleReducer, vehicleReviewsReducer, reviewReducer } from './vehicleReducers';
import { authReducer, loadedUserReducer, userReducer, forgotPasswordReducer 
,allUsersReducer,userDetailsReducer} from './userReducers';
import { checkBookingReducer, bookedDatesReducer, bookingsReducer,
    bookingReducer } from './bookingReducers'


const reducer = combineReducers({
    allVehicles: allVehiclesReducer,
    newVehicle: newVehicleReducer,
    vehicleDetails: vehicleDetailsReducer,
    vehicle: vehicleReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    bookings: bookingsReducer,
    booking: bookingReducer,
    bookingDetails: bookingDetailsReducer,
    newReview: newReviewReducer,
    checkReview: checkReviewReducer,
    vehicleReviews: vehicleReviewsReducer,
    review: reviewReducer


})

export default reducer 