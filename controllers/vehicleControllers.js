import Vehicle from '../models/vehicle';

const allVehicles = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'All Vehicles'
    });
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