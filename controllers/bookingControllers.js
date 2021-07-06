import Booking from '../models/booking'

import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment)

// Create new Booking   =>   /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {

    const {
        room,
        startDate,
        endDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
    } = req.body;

    const booking = await Booking.create({
        room,
        user: req.user._id,
        startDate,
        endDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now()
    })

    res.status(200).json({
        success: true,
        booking
    })

})

// Create new booking   =>   /api/bookings/check
const checkVehicleBookingAvailability = catchAsyncErrors(async (req, res) => {

    let { roomId, startDate, endDate } = req.query;

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const bookings = await Booking.find({
        room: roomId,
        $and: [{
            startDate: {
                $lte: endDate
            }
        }, {
            endDate: {
                $gte: startDate
            }
        }]
    })

    // Check if there is any booking available
    let isAvailable;

    if (bookings && bookings.length === 0) {
        isAvailable = true
    } else {
        isAvailable = false
    }

    res.status(200).json({
        success: true,
        isAvailable
    })
})

export {
    newBooking,
    checkVehicleBookingAvailability,
} 