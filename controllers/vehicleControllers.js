import Vehicle from '../models/vehicle';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';

// fetch all vehicles   =>   /api/rooms
const allVehicles = catchAsyncErrors( async (req, res, next) => {
    const apiFeatures = new APIFeatures(Vehicle.find(),req.query).search();
    const vehicles = await APIFeatures.query;
    res.status(200).json({
        success: true,
        count: vehicles.length,
        vehicles
    })

});
// get vehicle details   =>   /api/vehicles/:id
const getSingleVehicle = catchAsyncErrors( async (req, res, next) => {
        const vehicle = await Vehicle.findById(req.query.id);
        if(!vehicle){
            return next(new ErrorHandler('vehicle not found with this ID'))
        }
        res.status(200).json({
            success: true,
            vehicle
        })
});
// Create new vehicle   =>   /api/vehicles
const newVehicle = catchAsyncErrors( async (req, res, next) => {
    
        const room = await Vehicle.create(req.body);

        res.status(200).json({
            success: true,
            room
        })

});
// update room details   =>   /api/rooms/:id
const updateVehicle = catchAsyncErrors( async (req, res, next) => {

        let vehicle = await Vehicle.findById(req.query.id);
        console.log(vehicle);

        if(!vehicle){
            return next(new ErrorHandler('vehicle not found with this ID'))
        }
        vehicle = await Vehicle.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            vehicle
        })

});
const deleteVehicle = catchAsyncErrors( async (req, res, next) => {
        let vehicle = await Vehicle.findById(req.query.id);

        if(!vehicle){
            return next(new ErrorHandler('vehicle not found with this ID'))
        }
        await vehicle.remove();
        res.status(200).json({
            success: true,
            message: 'vehicle is deleted.'
        })
});
export {
    allVehicles,
    newVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
} 