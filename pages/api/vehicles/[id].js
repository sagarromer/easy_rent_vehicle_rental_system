import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getSingleVehicle, updateVehicle, deleteVehicle } from '../../../controllers/vehicleControllers';
import onError from '../../../middlewares/error';

const handler = nc({ onError });
dbConnect();

handler.get(getSingleVehicle);

handler.put(updateVehicle);
handler.delete(deleteVehicle);
export default handler; 