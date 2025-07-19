import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';
export const PORT = process.env.PORT || 5000;

// export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
// export const SERVER_PORT = process.env.SERVER_PORT;

//MongoDB
// export const MONGODB_URI = process.env.MONGODB_URI;

// export const SERVER = {
// 	SERVER_HOSTNAME,
// 	SERVER_PORT,
// 	MONGODB_URI
// };

//MySQL
export const sequelize = new Sequelize(
	process.env.DB_NAME || 'skoolsync', // database
	process.env.DB_USER || 'root', // username
	process.env.DB_PASS || '', // password
	{
		dialect: 'mysql',
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT || '3306', 10),
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	}
);
