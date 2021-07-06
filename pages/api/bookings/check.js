import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect'

import { checkVehicleBookingAvailability } from '../../../controllers/bookingControllers';

import onError from '../../../middlewares/error';

const handler = nc({ onError });

dbConnect();

handler.get(checkVehicleBookingAvailability);

export default handler; 