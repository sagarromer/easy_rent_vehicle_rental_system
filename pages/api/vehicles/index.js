import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { allVehicles } from '../../../controllers/vehicleControllers';

const handler = nc();
dbConnect();


handler.get(allVehicles);

export default handler; 