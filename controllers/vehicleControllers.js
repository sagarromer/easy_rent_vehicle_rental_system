import Vehicle from '../models/vehicle';
import Booking from '../models/booking'

import cloudinary from 'cloudinary'
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';

// fetch all vehicles   =>   /api/vehicles
const allVehicles = catchAsyncErrors( async (req, res, next) => {
    const resPerPage = 4;
    const vehiclesCount = await Vehicle.countDocuments();
    const apiFeatures = new APIFeatures(Vehicle.find(),req.query).search().filter();
    let vehicles = await apiFeatures.query;
    let filteredVehiclesCount = vehicles.length;
    apiFeatures.pagination(resPerPage);
    //vehicles = await apiFeatures.query;
    res.status(200).json({
        success: true,
        vehicles,
        vehiclesCount,
        resPerPage,
        filteredVehiclesCount

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
    const images = req.body.images;

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'bookit/vehicles',
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })

    }

    req.body.images = imagesLinks;
    req.body.user = req.user._id;
        const vehicle = await Vehicle.create(req.body);

        res.status(200).json({
            success: true,
            vehicle
        })

});
// update vehicle details   =>   /api/vehicles/:id
const updateVehicle = catchAsyncErrors( async (req, res, next) => {

        let vehicle = await Vehicle.findById(req.query.id);
        console.log(vehicle);

        if(!vehicle){
            return next(new ErrorHandler('vehicle not found with this ID'))
        }
        for(let i =0;i < vehicle.images.length; i++){
            await cloudinary.v2.uploader.destroy(vehicle.images[i].public_id);
        }
        let imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
    
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'bookit/vehicles',
            });
    
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
            req.body.images = imagesLinks
    
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
        // Delete images associated with the vehicle
        for (let i = 0; i < vehicle.images.length; i++) {
            await cloudinary.v2.uploader.destroy(vehicle.images[i].public_id)
        }

        await vehicle.remove();
        res.status(200).json({
            success: true,
            message: 'vehicle is deleted.'
        })
});
// Create a new review   =>   /api/reviews
const createVehicleReview = catchAsyncErrors(async (req, res) => {

    const { rating, comment, vehicleId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const vehicle = await Vehicle.findById(vehicleId);

    const isReviewed = vehicle.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {

        vehicle.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        vehicle.reviews.push(review);
        vehicle.numOfReviews = vehicle.reviews.length
    }

    vehicle.ratings = vehicle.reviews.reduce((acc, item) => item.rating + acc, 0) / vehicle.reviews.length

    await vehicle.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
    })

})
// Check Review Availability   =>   /api/reviews/check_review_availability
const checkReviewAvailability = catchAsyncErrors(async (req, res) => {

    const { vehicleId } = req.query;

    const bookings = await Booking.find({ user: req.user._id, vehicle: vehicleId })

    let isReviewAvailable = false;
    if (bookings.length > 0) isReviewAvailable = true


    res.status(200).json({
        success: true,
        isReviewAvailable
    })

})
// Get all vehicles - ADMIN   =>   /api/admin/vehicles
const allAdminVehicles = catchAsyncErrors(async (req, res) => {

    const vehicles = await Vehicle.find();

    res.status(200).json({
        success: true,
        vehicles
    })

})
// Get all vehicle reviews - ADMIN   =>   /api/reviews
const getVehicleReviews = catchAsyncErrors(async (req, res) => {

    const vehicle = await Vehicle.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: vehicle.reviews
    })

})

// Delete vehicle review - ADMIN   =>   /api/reviews
const deleteReview = catchAsyncErrors(async (req, res) => {

    const vehicle = await Vehicle.findById(req.query.vehicleId);

    const reviews = vehicle.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    const numOfReviews = reviews.length;

    const ratings = vehicle.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Vehicle.findByIdAndUpdate(req.query.vehicleId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})

export {
    allVehicles,
    newVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
    createVehicleReview,
    checkReviewAvailability,
    allAdminVehicles,
    getVehicleReviews,
    deleteReview

} 