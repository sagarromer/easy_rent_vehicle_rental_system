import { combineReducers } from 'redux';
import { allVehiclesReducer } from './vehicleReducers';


const reducer = combineReducers({
    allVehicles: allVehiclesReducer
})

export default reducer 