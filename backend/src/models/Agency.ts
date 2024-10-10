import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Agency extends Model {}

Agency.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Additional fields as required
}, {
  sequelize,
  modelName: 'Agency',
});

export default Agency;
