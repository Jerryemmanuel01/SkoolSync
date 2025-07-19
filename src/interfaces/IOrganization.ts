import { Document } from 'mongoose';

export interface IOrganization extends Document {
	fullname: string;
	email: string;
	password: string;
	confirmPassword: string;
	phone: string;
	address: string;
	isMain?: boolean;
	isSuspended?: boolean;
}

export interface IOrganizationLogin extends Document {
	email: string;
	password: string;
}
