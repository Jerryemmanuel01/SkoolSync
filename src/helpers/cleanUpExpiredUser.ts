import User from '../models/userModel';
import authTokenModel from '../models/authTokenModel';
import { Op } from 'sequelize';

// Cleanup expired tokens and delete associated users
export const cleanupExpiredTokens = async () => {
	try {
		const now = new Date();
		const expiredTokens = await authTokenModel.findAll({ where: { expiresAt: { [Op.lt]: now } } });

		// Parallel deletion for better performance
		await Promise.all(
			expiredTokens.map(async (token) => {
				const { userId, id } = token.get();
				await User.destroy({ where: { id: userId, isEmailVerified: false } });
				await authTokenModel.destroy({ where: { id } });
			})
		);
	} catch (error) {
		console.error('Error during expired token cleanup:', error);
	}
};

// Cleanup tokens and user after a failed email verification
export const cleanupTokensAfterFailedEmailMessage = async ({ id }: { id: string }) => {
	try {
		await User.destroy({ where: { id, isEmailVerified: false } });
		await authTokenModel.destroy({ where: { userId: id } });
	} catch (error) {
		console.error(`Error during cleanup after failed email for user ${id}:`, error);
	}
};
