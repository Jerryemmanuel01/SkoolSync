import express from 'express';

import { adminRoute } from './adminRoutes';
import { authRoute } from './authRoute';

const router = express.Router();

const defaultRoutes = [
	{
		path: '/auth',
		route: authRoute
	},
	{
		path: '/admin/auth',
		route: adminRoute
	}
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
