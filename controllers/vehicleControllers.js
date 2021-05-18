import Vehicle from '../models/vehicle';

// fetch all vehicles   =>   /api/rooms
const allVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json({
            success: true,
            count: vehicles.length,
            vehicles
        })
    } catch(err) {
        res.status(400).json({
            success: false,
            error: error
        })
    }

}
// Create new vehicle   =>   /api/vehicles
const newVehicle = async (req, res) => {
    try{
        const room = await Vehicle.create(req.body);

        res.status(200).json({
            success: true,
            room
        })
    } catch {
        res.status(400).json({
            success: false,
            error: error
        })
    }

}
export {
    allVehicles,
    newVehicle
} 