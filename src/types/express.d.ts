// types/express.d.ts
import { Request } from 'express';
import { IUser } from '../interfaces/IUser';
import { IAdmin } from '../interfaces/IAdmin';
import { IOrganization } from '../interfaces/IOrganization';

export interface RequestCustom extends Request {
	user?: IUser;
	admin?: IAdmin;
	organization?: IOrganization;
	files?: any;
}
