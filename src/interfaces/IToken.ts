import { Document, Types } from 'mongoose';

export interface IToken extends Document {
	adminId?: Types.ObjectId;
	refreshToken: string;
	expiresAt?: Date;
	userId?: Types.ObjectId;
	authCode?: string;
}
