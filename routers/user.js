import expressRouter from 'express';

import { register } from '../controllers/user.js';

const router = expressRouter.Router();

router.post('/register', register);

export default router;
