import { Schema, model } from 'mongoose';
import { IToken } from '../interfaces/IToken';

const tokenSchema = new Schema<IToken>({
	adminId: { type: Schema.Types.ObjectId, ref: 'Admin' },
	refreshToken: { type: String, required: true },
	expiresAt: { type: Date, required: true }
});

export default model<IToken>('Token', tokenSchema);
