import User from './userModel';
import TokenSchema from './tokenModel';
import authTokenModel from './authTokenModel';
import { sequelize } from '../config/config';

TokenSchema.belongsTo(User, { foreignKey: 'userId', as: 'user' });
authTokenModel.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(TokenSchema, { foreignKey: 'userId', as: 'token' });

export { User, TokenSchema, authTokenModel, sequelize };
