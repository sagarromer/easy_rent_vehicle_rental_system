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
// Check booked dates of a room   =>   /api/bookings/check_booked_dates
const checkBookedDatesOfVehicle = catchAsyncErrors(async (req, res) => {

    const { roomId } = req.query;

    const bookings = await Booking.find({ room: roomId });

    let bookedDates = [];

    const timeDiffernece = moment().utcOffset() / 60;

    bookings.forEach(booking => {

        const startDate = moment(booking.startDate).add(timeDiffernece, 'hours')
        const endDate = moment(booking.endDate).add(timeDiffernece, 'hours')

        const range = moment.range(moment(startDate), moment(endDate));

        const dates = Array.from(range.by('day'));
        bookedDates = bookedDates.concat(dates);
    })

    res.status(200).json({
        success: true,
        bookedDates
    })
})
// Get all bookings of current user   =>   /api/bookings/me
const myBookings = catchAsyncErrors(async (req, res) => {

    const bookings = await Booking.find({ user: req.user._id })
        .populate({
            path: 'room',
            select: 'name pricePerDay images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        bookings
    })
})
// Get booking details   =>   /api/bookings/:id
const getBookingDetails = catchAsyncErrors(async (req, res) => {

    const booking = await Booking.findById(req.query.id)
        .populate({
            path: 'vehicle',
            select: 'name pricePerDay images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        booking
    })
})
export {
    newBooking,
    checkVehicleBookingAvailability,
    checkBookedDatesOfVehicle,
    myBookings,
    getBookingDetails
} 