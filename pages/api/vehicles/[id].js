import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getSingleVehicle, updateVehicle, deleteVehicle } from '../../../controllers/vehicleControllers';

const handler = nc();
dbConnect();

handler.get(getSingleVehicle);

handler.put(updateVehicle);
handler.delete(deleteVehicle);
export default handler; 