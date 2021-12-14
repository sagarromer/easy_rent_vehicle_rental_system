import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { allVehicles, newVehicle } from '../../../controllers/vehicleControllers';
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth';
import onError from '../../../middlewares/error';

const handler = nc({ onError });
dbConnect();


handler.get(allVehicles);
handler
.use(isAuthenticatedUser, authorizeRoles('admin'))
.post(newVehicle);

export default handler; 