import { sequelize } from '../config/config';
import { DataTypes } from 'sequelize';
import { IToken } from '../interfaces/IToken';

const authTokenModel = sequelize.define(
	'AuthToken',
	{
		userId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		authCode: {
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

export default authTokenModel;
