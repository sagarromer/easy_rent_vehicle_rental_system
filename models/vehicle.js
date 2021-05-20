const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter vehicle name'],
        trim: true,
        maxLength: [100, 'Room name cannot exceed 100 characters']
    },
    pricePerDay: {
        type: Number,
        required: [true, 'Please enter vehicle price per one day'],
        maxLength: [4, 'Room name cannot exceed 4 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter vehicle description'],
    },
    vehicleNumber: {
        type: String,
        required: [true, 'Please enter vehicle Number'],
    },
    passengerCapacity: {
        type: Number,
        required: [true, 'Please enter vehicle passenger capacity'],
    },
    numOfSeats: {
        type: Number,
        required: [true, 'Please enter number of seats in vehicle'],
    },
    internet: {
        type: Boolean,
        default: false,
    },
    airbags: {
        type: Boolean,
        default: false,
    },
    airConditioned: {
        type: Boolean,
        default: false,
    },
    centralLocking: {
        type: Boolean,
        default: false,
    },
    fogLamps: {
        type: Boolean,
        default: false,
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please enter vehicle category'],
        enum: {
            values: [
                'Luxury',
                'Convertible',
                'Compact SUV',
                'Intermediate',
                'Minivan',
                'Passenger Van',
                'Pickup truck',
                'Hybrid',
                'Electric'
            ],
            message: 'Please select correct category for vehicle'
        }
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);