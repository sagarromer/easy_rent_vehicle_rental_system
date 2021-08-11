import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { allVehicles, newVehicle } from '../../../controllers/vehicleControllers';
import onError from '../../../middlewares/error';

const handler = nc({ onError });
dbConnect();


handler.get(allVehicles);
handler
.use(isAuthenticated, authorizeRoles('admin'))
.post(newVehicle);

export default handler; 