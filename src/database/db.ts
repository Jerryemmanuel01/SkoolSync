import { DEVELOPMENT, sequelize } from '../config/config';

export const connectDb = async () => {
	try {
		const conn = await sequelize.authenticate();
		logging.log('-------------------------------------------');
		logging.log(`MySQL Connected: ${conn}`);
		logging.log('-------------------------------------------');
		if (DEVELOPMENT) {
			await sequelize.sync({ alter: true });
			logging.log('Database synced with alterations.');
		}
	} catch (error) {
		logging.error('-------------------------------------------');
		logging.error(error);
		logging.error('-------------------------------------------');
		process.exit(1);
	}
};
