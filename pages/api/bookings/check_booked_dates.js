import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect'

import { checkBookedDatesOfVehicle } from '../../../controllers/bookingControllers';

import onError from '../../../middlewares/error';

const handler = nc({ onError });

dbConnect();

handler.get(checkBookedDatesOfVehicle);

export default handler; 