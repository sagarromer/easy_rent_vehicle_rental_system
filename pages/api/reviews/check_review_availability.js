import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { checkReviewAvailability } from '../../../controllers/roomControllers'

import onError from '../../../middlewares/error'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser)
    .get(checkReviewAvailability)

export default handler; 