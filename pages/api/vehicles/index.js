import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { allVehicles, newVehicle } from '../../../controllers/vehicleControllers';

const handler = nc();
dbConnect();


handler.get(allVehicles);
handler.post(newVehicle);

export default handler; 