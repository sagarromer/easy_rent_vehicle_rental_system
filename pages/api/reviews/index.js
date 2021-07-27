import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { createVehicleReview, getVehicleReviews, deleteReview } from '../../../controllers/vehicleControllers'

import onError from '../../../middlewares/error'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser)
    .put(createVehicleReview)


// handler
//     .use(isAuthenticatedUser)
//     .get(getVehicleReviews)


// handler
//     .use(isAuthenticatedUser)
//     .delete(deleteReview)

export default handler; 