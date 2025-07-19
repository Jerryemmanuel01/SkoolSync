import http from 'http';
import './config/logging';
import { PORT } from './config/config';
import { connectDb } from './database/db';
import { application } from './app';
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
	logging.info('-------------------------------------------');
	logging.info('Connect Database');
	logging.info('-------------------------------------------');
	connectDb();

	logging.info('-------------------------------------------');
	logging.info('Start Application');
	logging.info('-------------------------------------------');
	httpServer = http.createServer(application);
	httpServer.listen(PORT, () => {
		logging.log('----------------------------------------');
		logging.log(`Server started on http://localhost:${PORT}`);
		logging.log('----------------------------------------');
	});
};

export const Shutdown = (callback: any) => {
	httpServer && httpServer.close(callback);
};

Main();
