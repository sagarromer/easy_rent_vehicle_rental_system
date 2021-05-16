const allVehicles = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'All Vehicles'
    });
}

export {
    allVehicles
} 