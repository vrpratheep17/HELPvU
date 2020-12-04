export default (sequelize, DataTypes) => {
  const refresh_token = sequelize.define(
    "refresh_token",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      refresh_token: {
        type: DataTypes.TEXT(),
      },
    },
    {
      tableName: "refresh_token",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  return refresh_token;
};


