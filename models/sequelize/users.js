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

        len: [2, 10],
      },
      last_name: {
        type: DataTypes.STRING,
        len: [2, 10],
      },
      mobile_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,

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
