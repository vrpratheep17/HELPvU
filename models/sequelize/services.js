export default (sequelize, DataTypes) => {
  const services = sequelize.define(
    "services",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [2, 20],
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        isUrl: true,
      },
    },
    {
      tableName: "services",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  return services;
};
