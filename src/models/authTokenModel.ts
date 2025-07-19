import { sequelize } from '../config/config';
import { DataTypes } from 'sequelize';
import { IToken } from '../interfaces/IToken';

const authTokenModel = sequelize.define(
	'AuthToken',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		userId: {
			type: DataTypes.UUID,
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
