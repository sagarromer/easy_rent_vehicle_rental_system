const Vehicle = require('../models/vehicle');
const mongoose = require('mongoose');

const vehicles = require('../data/vehicles')

mongoose.connect('mongodb+srv://easy_rent:easyrent123456@cluster0.hk9vw.mongodb.net/easy_rent_vehicle_rentals?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
}).then(con => console.log('connection established'))
const seedVehicles = async () => {
    try {

        await Vehicle.deleteMany();
        console.log('Vehicles are deleted');

        await Vehicle.insertMany(vehicles);
        console.log('All vehicles are added.');

        process.exit()


    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

seedVehicles() 