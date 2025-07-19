import { sequelize } from '../config/config';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { UserInstance } from '../interfaces/IUser';

const User = sequelize.define<UserInstance>(
	'User',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [8, 100] }
		},
		role: {
			type: DataTypes.ENUM('student', 'teacher', 'admin'),
			defaultValue: 'student',
			allowNull: false
		},
		isEmailVerified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
	},
	{
		timestamps: true
	}
);

// Hash password before creating or updating a user
User.beforeCreate(async (user: UserInstance) => {
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
});
User.beforeUpdate(async (user: UserInstance) => {
	if (user.changed('password')) {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
	}
});

// Method to compare passwords
//@ts-ignore
User.prototype.comparePassword = async function (password: string) {
	// @ts-ignore
	return await bcrypt.compare(password, this.password);
};

export default User;
