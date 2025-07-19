import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const TokenSchema = sequelize.define(
	'Token',
	{
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		refreshToken: {
			type: DataTypes.STRING,
			allowNull: false
		},
		expiresAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		timestamps: true
	}
);

export default TokenSchema;
