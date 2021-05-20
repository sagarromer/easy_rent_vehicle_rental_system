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
// get vehicle details   =>   /api/vehicles/:id
const getSingleVehicle = async (req, res) => {
    try{
        const vehicle = await Vehicle.findById(req.query.id);
        if(!vehicle){
            return res.status(404).json({
                success: false,
                room: 'vehicle not found with this ID'
            })
        }
        res.status(200).json({
            success: true,
            vehicle
        })

    } catch(error){
        res.status(400).json({
            success: true,
            error: error.message
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
    newVehicle,
    getSingleVehicle
} 