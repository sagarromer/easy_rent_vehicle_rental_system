import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getSingleVehicle, updateVehicle } from '../../../controllers/vehicleControllers';

const handler = nc();
dbConnect();

handler.get(getSingleVehicle);

handler.put(updateVehicle);

export default handler; 