import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getSingleVehicle } from '../../../controllers/vehicleControllers';

const handler = nc();
dbConnect();

handler.get(getSingleVehicle);

export default handler; 