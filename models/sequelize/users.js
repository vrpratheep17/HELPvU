export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [2, 10],
      },
      last_name: {
        type: DataTypes.STRING,
        len: [2, 10],
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 4,
      },
      user_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "users",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  return users;
};
