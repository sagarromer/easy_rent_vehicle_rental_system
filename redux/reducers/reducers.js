import { combineReducers } from 'redux';
import { allVehiclesReducer, vehicleDetailsReducer } from './vehicleReducers';
import { authReducer, loadedUserReducer, userReducer } from './userReducers';


const reducer = combineReducers({
    allVehicles: allVehiclesReducer,
    vehicleDetails: vehicleDetailsReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
    user: userReducer

})

export default reducer 