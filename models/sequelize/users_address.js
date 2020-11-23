export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users_address",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: users,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      type: {
        type: DataTypes.STRING,
        isIn: [["Home", "Office"]],
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [2, 12],
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      landmark: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users_address",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  return users_address;
};
