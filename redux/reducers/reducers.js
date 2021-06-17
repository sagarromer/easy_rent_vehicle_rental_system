import { combineReducers } from 'redux';
import { allVehiclesReducer, vehicleDetailsReducer } from './vehicleReducers';
import { authReducer } from './userReducers';


const reducer = combineReducers({
    allVehicles: allVehiclesReducer,
    vehicleDetails: vehicleDetailsReducer,
    auth: authReducer,

})

export default reducer 