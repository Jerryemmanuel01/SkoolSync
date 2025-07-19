import { Model, Optional } from 'sequelize';

export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: 'student' | 'teacher' | 'admin';
	createdAt?: Date;
	updatedAt?: Date;
	isEmailVerified: boolean;
}

export interface UserCreationAttributes extends Optional<IUser, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UserInstance extends Model<IUser, UserCreationAttributes>, IUser {
	comparePassword(password: string): Promise<boolean>;
}
