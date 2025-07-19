import express from 'express';
import './config/logging';
import { corsHandler } from './middleware/corsHandler';
import { errorHandler } from './middleware/errorHandler';
import { loggingHandler } from './middleware/loggingHandler';
import routes from './routes/v1';

const application = express();

logging.info('-------------------------------------------');
logging.info('Starting the application');
logging.info('-------------------------------------------');
application.use(express.json());
application.use(express.urlencoded({ extended: true }));

logging.info('-------------------------------------------');
logging.info('Logging & Configuration');
logging.info('-------------------------------------------');
application.use(loggingHandler);
application.use(corsHandler);

logging.info('-------------------------------------------');
logging.info('Errors Handling');
logging.info('-------------------------------------------');
application.use(errorHandler);

//v1 api routes
application.use('/api/v1', routes);

export { application };
