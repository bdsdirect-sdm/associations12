import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Hobby extends Model {}

Hobby.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Hobby',
});

export default Hobby;
