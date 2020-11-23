export default (sequelize, DataTypes) => {
  const user_booking_history = sequelize.define(
    "user_booking_history",
    {
      id: {
        type: DataTypes.INTEGER,
        references: {
          model: users,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      service_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      charge: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      service_by_person_name: {
        type: DataTypes.STRING,
      },
      service_by_person_number: {
        type: DataTypes.INTEGER,
      },
      service_status: {
        type: DataTypes.STRING,
        isIn: [["Completed", "in process", "Cancelled"]],
      },
    },
    {
      tableName: "user_booking_history",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  return user_booking_history;
};
