import { Response } from 'express';
import { RequestCustom } from '../types/express';
import { IParams } from '../interfaces/IParams';
import { IServiceResponse } from '../interfaces/IServiceResponse';

export const handleRequest = <T = any, R = any>(serviceFunction: (params: IParams<T>) => Promise<IServiceResponse<R>>) => {
	return async (req: RequestCustom, res: Response) => {
		try {
			// Construct params with all possible request data
			const params: IParams<T> = {
				data: req.body,
				query: { ...req.query, ...req.params },
				user: req.user || req.admin || req.organization,
				files: req.files
			};
			// Execute the service function
			const result = await serviceFunction(params);
			// Send response
			res.status(200).json(result);
		} catch (error: any) {
			// Handle errors with appropriate status codes
			const statusCode = error.statusCode || 400;

			res.status(statusCode).json({
				success: false,
				message: error.message || 'An error occurred',
				data: null
			});
		}
	};
};
