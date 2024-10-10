import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class User extends Model {}

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNo: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    defaultValue: 'male',
  },
  userType: {
    type: DataTypes.INTEGER,
    allowNull: false, // 1 for Job Seeker, 2 for Agency
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;
