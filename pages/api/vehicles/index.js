import nc from 'next-connect';
import { allVehicles } from '../../../controllers/vehicleControllers';

const handler = nc();

handler.get(allVehicles);

export default handler; 