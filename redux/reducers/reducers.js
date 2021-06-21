import { combineReducers } from 'redux';
import { allVehiclesReducer, vehicleDetailsReducer } from './vehicleReducers';
import { authReducer, loadedUserReducer } from './userReducers';


const reducer = combineReducers({
    allVehicles: allVehiclesReducer,
    vehicleDetails: vehicleDetailsReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer

})

export default reducer 